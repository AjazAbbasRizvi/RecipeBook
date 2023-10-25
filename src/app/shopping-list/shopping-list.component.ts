import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/shopping-list.service';
// import { Ingredient } from '../shared/ingredient.model';
import { IngredientModel } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredient :IngredientModel[]= [
  //   new IngredientModel('Apples', 5),
  //   new IngredientModel('Mango', 6)
  // ];

  public ingredient :IngredientModel[] =[]
  private storesubscription : Subscription

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(){
    this.getIngredient();
    this.storesubscription = this.shoppingListService.ingredientChanged.subscribe((ingredients : IngredientModel[])=>{
      this.ingredient = ingredients;
      // console.log("Eevent Fired")
    })
  }

  onEditItem(index : number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.storesubscription.unsubscribe()
  }

  // showIngredient(Ingredient : IngredientModel){
  //   this.ingredient.push(Ingredient);
  // }

  getIngredient(){
    this.ingredient = this.shoppingListService.getIngredient();
  }

}
