import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { Toast } from '@ionic-native/toast'
import firebase from 'firebase'
@IonicPage()
@Component({
  selector: 'page-editmenu',
  templateUrl: 'editmenu.html',
})
export class EditmenuPage {

  editData
  menuData ={lunch:'',breakfast:''}
  foodList
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public toast : Toast) {
    // console.log('data ' +JSON.stringify(this.navParams.get("weekData")));
      this.editData = this.navParams.get("weekData")
       this.menuData.lunch = this.editData.value.lunch
    this.menuData.breakfast = this.editData.value.breakfast
     this.getFoodList()
}
  

  // ionViewDidLoad() {
  //   console.log('data ' + JSON.stringify(this.navParams.get("weekData")));
  
  //   // this.menuData.lunch = this.editData.value.lunch
  //   // this.menuData.breakfast = this.editData.value.breakfast
   
  // }

  saveUpdate(){
     firebase.database().ref(this.auth.databaseWeeklymenu).child(this.editData.id).update({lunch:this.menuData.lunch.toString(),breakfast:this.menuData.breakfast.toString()}).then((res)=>{
             
                this.navCtrl.setRoot("WeeklymenuPage");
             }).catch(error=>{
                this.toast.show("There is some error while update. Please try later","long","bottom")
             })
  }
  getFoodList(){
    this.auth.getFoodData().then((data)=>{
      console.log(data)
       this.foodList = data;
    }).catch(error =>{
        this.toast.show("There is erro while fetching data.","long","bottom");
    })
  }
}