import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { IngredientModel } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shoppinglist-edit',
  templateUrl: './shoppinglist-edit.component.html',
  styleUrls: ['./shoppinglist-edit.component.css']
})
export class ShoppinglistEditComponent implements OnInit {

  // first Approach 
  // @Output () IngredientAdded = new EventEmitter<{name: string, amount: number}> ();

  // second Approach
  // @Output () IngredientAdded = new EventEmitter<IngredientModel> ()

  @ViewChild('f') shoppingListForm : NgForm;
  private subscription : Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem : IngredientModel;


  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index : number) =>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getEditIngredient(index);
        this.shoppingListForm.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        })
    })
  }

  ngOnDestroy() {
      this.subscription.unsubscribe()
  }

  SaveData(form : NgForm){
    const value = form.value
    let newIngredientModel = new IngredientModel(value.name, value.amount);
    // this.IngredientAdded.emit(newIngredientModel)
    if (this.editMode) {
      this.shoppingListService.UpdateIngrediemt(this.editedItemIndex, newIngredientModel)
    }
    else{
      this.shoppingListService.addIngredient(newIngredientModel)
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  Clear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  DeleteItem(){
    this.shoppingListService.DeleteIngredient(this.editedItemIndex);
    this.Clear();
  }
}
