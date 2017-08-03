import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthProvider } from '../../providers/auth/auth'
import {Toast} from '@ionic-native/toast'
import firebase from 'firebase';
// import KidsData from '../../data/KidsData';
@IonicPage()
@Component({
  selector: 'page-kids-photos',
  templateUrl: 'kids-photos.html',
})
export class KidsPhotosPage {
    loadeditemList: any[];
    itemList: any[];
   limit:any = 3;
   startAt = 0
    itemRef;
  kidsPhotos=[];
  domainUrl
  public childDataList:Array<any>;
  // public loadedChildList:Array<any>;
  public childDataRef//:firebase.database.Reference
    public childDataRef12:firebase.database.Reference
public people:any = [];
  private start:number=0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast:Toast) {
  
  }

 

ionViewDidLoad(){
  this.domainUrl=this.auth.domainStorageUrl
        this.getKidsPhotos()  
}
// ionViewDidEnter(){
//         this.getKidsPhotos()  
// }

getKidsPhotos(){
  console.log("Daycare  ==>>  " +this.navParams.get("isDaycare"));
    this.childDataRef = firebase.database().ref(this.auth.databaseChildren);
      this.childDataRef.on('value', childDataList => {
        let childData = [];
        let parentData = [];
        let i =0
        var user = childDataList.val();
        childDataList.forEach( child => {
            //  childData.push({id:child.key,value:child.val()});
              //  console.log(child.val().uid_parent)
              firebase.database().ref(this.auth.databaseParents)
            
                .child(child.val().uid_parent)
                .on('value', data => {
                  
                  parentData = data.val().username
                  if(this.navParams.get("isDaycare")){
                     var duid= child.val().uid_daycare;
                    if(duid == firebase.auth().currentUser.uid)
                     childData.push({id:child.key,value:child.val(),parentsData:parentData});
                  
                  }else{
                    var duid= child.val().uid_daycare;
                    if(child.val().uid_parent === firebase.auth().currentUser.uid)
                     childData.push({id:child.key,value:child.val(),parentsData:parentData});
                  }
                  
                });
                
                
              return false;
            
      });
      this.childDataList = childData;
      // this.loadedChildList = childData;  
      console.log(this.childDataList)
   });
   
}
 
  allPhotos(kids,uid,childDataList){
    // alert(uid)
    this.navCtrl.push("KidPhotosPage", {"uid":uid,"childDataList":childDataList});
  }

}
