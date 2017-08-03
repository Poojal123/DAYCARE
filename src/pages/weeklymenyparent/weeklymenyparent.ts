import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
/**
 * Generated class for the WeeklymenyparentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-weeklymenyparent',
  templateUrl: 'weeklymenyparent.html',
})
export class WeeklymenyparentPage {
weeklyData
  constructor(public navCtrl: NavController, public navParams: NavParams ,public auth:AuthProvider) {
    var dt = new Date("2017-08-09")  //current date of week
    var currentWeekDay = dt.getDay();
    var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay-1
    var wkStart = new Date(new Date(dt).setDate(dt.getDate()- lessDays));
    var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate()+5));
    let dd:any = wkStart.getDate();
      let mm:any = wkStart.getMonth()+1; //January is 0!

        var yyyy = wkStart.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        } 
    
     let dd1:any = wkEnd.getDate();
      let mm1:any = wkEnd.getMonth()+1; //January is 0!

        var yyyy1 = wkEnd.getFullYear();
        if(dd1<10){
            dd1='0'+dd1;
        } 
        if(mm1<10){
            mm1='0'+mm1;
        } 
    console.log("first " + yyyy+'-'+mm+'-'+dd + "    lastday "+yyyy1+'-'+mm1+'-'+dd1 )

    this.getData({"start":yyyy+'-'+mm+'-'+dd,"end": yyyy1+'-'+mm1+'-'+dd1})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeeklymenyparentPage');
  }
getData(data){
    this.auth.getWeeklyMenu(data).then((res)=>{
         this.weeklyData = res;
      })
  } 
}
