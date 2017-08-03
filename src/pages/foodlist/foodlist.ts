import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth"
import { Toast } from "@ionic-native/toast"
import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-foodlist',
  templateUrl: 'foodlist.html',
})

export class FoodlistPage {

foodlist
numboffood
  constructor(public navCtrl: NavController, public toastCtrl:Toast,
              public navParams: NavParams,public auth:AuthProvider,
              public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyMenuPage');
    this. getFoodData()
  }
  getFoodData(){
    this.auth.getFoodData().then((res)=>{
      // console.log(res)
        this.foodlist = res;
        this.numboffood = this.auth.foodNumber;  
      
    }).catch((error)=>{
        this.toastCtrl.show("There is some problem while fetching. Please try later","long","bottom")
    })
  }
  editFood(food) {
    let prompt = this.alertCtrl.create({
      title: `Dish Name`,
      cssClass:'addfoodClass',
      inputs: [
        {
          placeholder: 'Food Name',
           value: food.value.food
        },
      ],
      buttons: [
        {
          text: 'Delete',
          cssClass: 'deletebtn',
          handler: data => {
             firebase.database().ref(this.auth.databaseFood).child(food.id).remove().then((res)=>{
             
                this.getFoodData()
                 this.toastCtrl.show(food.value.food+ " deleted","long","bottom")
             }).catch(error=>{
                this.toastCtrl.show("There is some error while delete record. Please try later","long","bottom")
             })
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          cssClass: 'savebtn',
          handler: data => {
           
             firebase.database().ref(this.auth.databaseFood).child(food.id).update({food:data[0].toString(),date:"11-12-2017"}).then((res)=>{
             
                this.getFoodData()
             }).catch(error=>{
                this.toastCtrl.show("There is some error while update. Please try later","long","bottom")
             })
            console.log('Saved clicked');
          }
        },
        {
          cssClass: 'closeBtn',
          handler: data => {
           
          }
        }
      ]
    });
    prompt.present();
  }

  
  addFood(){
    let prompt = this.alertCtrl.create({
      title: `Dish Name`,
      cssClass: 'addfoodClass',
      inputs: [
        {
         name: 'food',
         placeholder: 'Food name'
        },
      ],
      buttons: [
        {
          text: 'Save',
          cssClass:'savebtn',
          handler: data => {
            // alert(data.food)
            this.auth.saveFood(data.food).then((res)=>{
               if(res){
                //  alert("sdfsdf");
                  this.getFoodData()
                  this.toastCtrl.show("Food added successfully","long","bottom")
               }
              }).catch((error)=>{
                  alert(error.message)
                  this.toastCtrl.show("There is problem while saving. Try later.","long","bottom")
              })
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}
@Pipe({ name: 'kyes1',  pure: false })
export class  kyes1 implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
      
      if(value) {
        // create instance vars to store keys and final output
        let keyArr: any[] = Object.keys(value),
            dataArr = [];

        // loop through the object,
        // pushing values to the return array
        keyArr.forEach((key: any) => {
            dataArr.push(value[key]);
        });
        // return the resulting array
        return dataArr.reverse();
      }
    }
}
