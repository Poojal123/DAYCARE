import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodlistPage, kyes1 } from './foodlist';

@NgModule({
  declarations: [
    FoodlistPage,
    kyes1
  ],
  imports: [
    IonicPageModule.forChild(FoodlistPage),
  ],
  exports: [
    FoodlistPage
  ]
})
export class FoodlistPageModule {}
