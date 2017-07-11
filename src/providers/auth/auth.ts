import { Injectable } from '@angular/core';
import { Http, HttpModule, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Transfer,TransferObject,FileUploadOptions } from '@ionic-native/transfer';
import {Toast} from '@ionic-native/toast'
import { MediaCapture } from '@ionic-native/media-capture';

// import SERVER_NAME from ‘../config’;
// 
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {
  public databaseParents ='/parentsData'
  public databaseChildren ='/childrenData'
  public databaseDaycare ='/userData'
countryList=[]
  base64textString
  public domainStorageUrl = 'http://192.168.10.194:3000/'
   public domainURL = 'http://192.168.10.194:3000/api/';
  constructor(public afDatabase: AngularFireDatabase,public http:Http,public transfer:Transfer,public toast:Toast) {
    console.log('Hello AuthProvider Provider');
    
   }

  doLogin(email: string, password: string):firebase.Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    register(email: string, password: string ,mobile,username):firebase.Promise<any>
    {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        
          .then((newUser) => {
              firebase.database().ref(this.databaseParents).child(newUser.uid).set({email: email,password:password,mobile:mobile,username:username,isparent:1,profile_pic:''});
          })
      }

      doLogout(): firebase.Promise<void> {
        return firebase.auth().signOut();
      }

      resetPassword(email: string): firebase.Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
      }

      getDaycare(data): Promise<any>{
        return new Promise( (resolve, reject) => {
        firebase.database().ref(this.databaseDaycare)
          .child(data.email)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }
      getProfile(){
        let formData = new URLSearchParams();
        formData.append("uid",firebase.auth().currentUser.uid);
      
        return this.http.post(this.domainURL + 'getProfile', {"uid":firebase.auth().currentUser.uid})
          .map(res => res.json())
          .catch(this.handleError);
      }
      // getChildrens(){
      //   let formData = new URLSearchParams();
      //    return this.http.post(this.domainURL + 'getAllChildrens', {})
      //     .map(res => res.json())
      //     .catch(this.handleError);
      // }

      getUserProfile(): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseParents)
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
              resolve(data.val())
          });
        });
         
      }
    
    getKidPhotos(uid): Promise<any> {
        // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseChildren)
          //  firebase.database().ref(db)
          .child(uid)
          .on('value', data => {
            
            resolve(data.val())
          });
        });
         
    }
    
    getdaycareProfile(): Promise<any> {
      // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseDaycare)
          //  firebase.database().ref(db)
          .child(firebase.auth().currentUser.uid)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }
      
      getkidsProfile(uid): Promise<any> {
      // console.log("helloo sharvari ===> "+SERVER_NAME)
        return new Promise( (resolve, reject) => {
          firebase.database().ref(this.databaseChildren)
          //  firebase.database().ref(db)
          .child(uid)
          .on('value', data => {
            resolve(data.val());
          });
        });
      }

    updateDaycare(data): Promise<any>{
       return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('parentsData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
    }
     
     getChildren():Promise<any>{
      return new Promise((resolve)=>{
        firebase.database().ref(this.databaseChildren).on('value', countryList => {
          let countries = [];
          
          countryList.forEach( country => {
              
                  countries.push({id:country.key,value:country.val()});
                  return false;
            
          });
          this.countryList = countries;
          })
          resolve(this.countryList);
      })
     }
  //    getKidsDataByCondition():Promise<any>{
  //     return new Promise((resolve)=>{
  //     firebase.database().ref(this.databaseChildren)
  //      .on('value', childDataList => {
  //       let childData = [];
  //       let parentData = [];
  //       let i =0
  //       var user = childDataList.val();
  //       childDataList.forEach( child => {
  //           //  childData.push({id:child.key,value:child.val()});
  //             //  console.log(child.val().uid_parent)
  //             firebase.database().ref(this.databaseParents)
            
  //               .child(child.val().uid_parent)
  //               .on('value', data => {
                  
  //                 parentData = data.val().username
  //                 if(this.navParams.get("isDaycare")){
                    
  //                    childData.push({id:child.key,value:child.val(),parentsData:parentData});
                  
  //                 }else{
  //                   if(child.val().uid_parent === firebase.auth().currentUser.uid)
  //                    childData.push({id:child.key,value:child.val(),parentsData:parentData});
  //                 }
                  
  //               });
                
                
  //             return false;
            
  //     });
  //     this.childDataList = childData;
  //     // this.loadedChildList = childData;  
  //     console.log(this.childDataList)
  //  });

  //     })
  //    }
     
     getData(dbname,uid):Promise<any>{
        return  new Promise((resolve)=>{
            firebase.database().ref(dbname)
          //  firebase.database().ref(db)
             .child(uid)
              .on('value', data => {
                resolve(data.val());
              });

        })
     }

    updateDatabase(data) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('parentsData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
   }

   updateDaycareDatabase(data) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref('userData').child(firebase.auth().currentUser.uid);
	        updateRef.update(data);
         resolve(true);
      });
   }
 
    uploadMultiImage(imageurils,uid_children,description): Promise<any>{
      
      return new Promise((resolve, reject) =>
      {
        console.log("sdkfhjskjdfh ===> "+imageurils.length)
        console.log("sdkfhjskjdfh ===> "+imageurils)
          for(var i=0;i<imageurils.length;i++){
            console.log(imageurils[i].images)

                var params = {
                          uid:uid_children
                         }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: imageurils[i].images.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(imageurils[i].images, encodeURI(this.domainURL+'uploadChildPhotos'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                // this.toastCtrl.dismissLoadin();
                                if(data1.response){
                                     console.log(res.profile_pic);
                                     var d = new Date();
                                      var month = d.getMonth();
                                     firebase.database().ref('childrenData/'+'1499346628069/'+'photos').push({ url: res.profile_pic,added_date_time:res.added_date_time,description:description,key_month:month});
                                   
                                 }
                                }, (err) => {
                            // error
                                alert("error" + JSON.stringify(err));
                                resolve(false);
                              });
              }
          resolve({status:true,flag:1});
      });
    }


    uploadVideoDataChild(videourl,uid,description): Promise<any>{
      console.log(videourl)
      return new Promise((resolve, reject) =>
      {
        var params = {
                          uid:uid
                         }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'videoFile',
                            fileName: videourl.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(videourl, encodeURI(this.domainURL+'uploadVideoOfChild'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                  if(data1.response){
                                     console.log(res.profile_pic);
                                     var d = new Date();
                                      var month = d.getMonth();
                                     firebase.database().ref('childrenData/'+uid+'/'+'videos').push({ url: res.profile_pic,added_date_time:res.added_date_time,discription:description,key_month:month});
                                   
                                 }
                                }, (err) => {
                            // error
                                alert("error" + JSON.stringify(err));
                                resolve(false);
                              });
              
          resolve({status:true,flag:1});
      });
    }

   
    _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
              this.base64textString= btoa(binaryString);
              console.log(btoa(binaryString));
      }
  
    addChild(data):Promise<any>{
        
        let uid_child       : string  =  new Date().getTime().toString();
        return new Promise((resolve) =>
              {
                
                         var params = {
                           uid:uid_child,
                           name: data.childname,
                           dob:data.birthday,
                           age:data.age,
                           gender:data.gender,
                           uid_parent:data.uid_parent,

                           uid_daycare:firebase.auth().currentUser.uid                            // uid_parent:data.uid_parent,
                            // uid_daycare:firebase.auth().currentUser.uid
                          }
                      const fileTransfer: TransferObject = this.transfer.create();

                            let options1: FileUploadOptions = {
                            fileKey: 'profile_pic',
                            fileName: data.pro_image.split('/').pop(),
                            headers: {}

                        }
                        options1.params = params;
                        fileTransfer.upload(data.pro_image, encodeURI(this.domainURL+'uploadChild'), options1)
                            .then((data1) => {
                              let res = JSON.parse(data1.response); 
                              console.log('JSON parsed result.response = ' + JSON.stringify(res));
                                // this.toastCtrl.dismissLoadin();
                                if(data1.response){
                                    // this.picChange=false;
                                    // this.toastCtrl.publishToast("Profile Updated Successfully..");
                                    //  alert("updated Successfully")
                                     console.log(res.profile_pic);
                                     firebase.database().ref('childrenData').child(uid_child).set({name: data.childname,dob:data.birthday,profile_pic:res.profile_pic,age:data.age,uid_parent:data.uid_parent,uid_daycare:firebase.auth().currentUser.uid});
                                    resolve(true);

                                 }

                                }, (err) => {
                            // error
                            alert("error" + JSON.stringify(err));
                            resolve(false);
                            }); 
              
              });
        //  return firebase.database().ref(this.databaseChildren).child(data.uid_parent).set({name: data.childname,dob:data.birthday,profile_pic:data.pro_image,age:data.age});
    }
      handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
