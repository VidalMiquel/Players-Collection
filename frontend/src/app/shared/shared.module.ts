import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ErrorDialogComponent,
  ]
})
export class SharedModule { }
