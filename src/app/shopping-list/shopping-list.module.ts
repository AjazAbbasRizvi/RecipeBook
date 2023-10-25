import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppinglistEditComponent } from './shoppinglist-edit/shoppinglist-edit.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppinglistEditComponent,
  ],
  exports:[
    ShoppingListComponent,
    ShoppinglistEditComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    SharedModule],
})
export class ShoppingListModule { }
