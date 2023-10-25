import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoaderComponent } from './loader/loader.component';
import { DropdownDirective } from './dropdown.directive';


@NgModule({
  declarations: [
    AlertComponent,
    LoaderComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    AlertComponent,
    LoaderComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ],
  
  
})
export class SharedModule { }
