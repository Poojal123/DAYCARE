import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { Toast } from '@ionic-native/toast'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the AddweeklymenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-addweeklymenu',
  templateUrl: 'addweeklymenu.html',
})
export class AddweeklymenuPage {
foodList
menu
DATE
 
menuData={date:'',lunch:'',breakfast:'',day:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public toast:Toast, public auth:AuthProvider ,public formBuilder:FormBuilder) {
    this.menu = this.formBuilder.group({
        date :["",Validators.required],
        lunch :["",Validators.required],
        breakfast:["",Validators.required]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddweeklymenuPage');
    this.getFoodList()
  }
  addMenu(){
      // 
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var d = new Date(this.menuData.date.toString());
      var dayName = days[d.getDay()];
      this.menuData.day = dayName;
      console.log(this.menuData)
      this.auth.saveWeeklyMenu(this.menuData).then(data=>{
          if(data){
            this.DATE = this.menuData.date;
              this.toast.show("Menu added","long","bottom");
              this.menuData={date:'',lunch:'',breakfast:'',day:''}
          }
      }).catch(error=>{
          console.log(error.message);
          this.toast.show("There is problem while saving data. Please try later.","long","bottom")
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
