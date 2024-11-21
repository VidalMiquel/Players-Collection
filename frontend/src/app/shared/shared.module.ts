import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SearchMessagesComponent } from './components/search-messages/search-messages.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ErrorDialogComponent,
    SearchMessagesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ErrorDialogComponent,
    SearchMessagesComponent
  ]
})
export class SharedModule { }
