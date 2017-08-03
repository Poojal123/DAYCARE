import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddweeklymenuPage } from './addweeklymenu';

@NgModule({
  declarations: [
    AddweeklymenuPage,
  ],
  imports: [
    IonicPageModule.forChild(AddweeklymenuPage),
  ],
  exports: [
    AddweeklymenuPage
  ]
})
export class AddweeklymenuPageModule {}
