import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklymenyparentPage } from './weeklymenyparent';

@NgModule({
  declarations: [
    WeeklymenyparentPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklymenyparentPage),
  ],
  exports: [
    WeeklymenyparentPage
  ]
})
export class WeeklymenyparentPageModule {}
