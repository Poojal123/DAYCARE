import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditmenuPage } from './editmenu';

@NgModule({
  declarations: [
    EditmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EditmenuPage),
  ],
  exports: [
    EditmenuPage
  ]
})
export class EditmenuPageModule {}
