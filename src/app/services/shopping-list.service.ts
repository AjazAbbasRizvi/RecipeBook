import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientModel } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  public ingredientChanged = new Subject<IngredientModel []> ();
  startedEditing = new Subject<number>();

  constructor() { }

  private ingredient :IngredientModel[]= [
    new IngredientModel('Apples', 5),
    // new IngredientModel('Mango', 6)
  ];

  setIngredient(ingredient : IngredientModel[]){
    this.ingredient = ingredient;
    this.ingredientChanged.next(this.ingredient.slice());
  }

  addIngredient(ingredient : IngredientModel){
    this.ingredient.push(ingredient);
    this.ingredientChanged.next(this.ingredient.slice())
  }

  getIngredient(){
    return this.ingredient;
  }

  addIngredients(ingredients : IngredientModel[]){
    for (let i = 0; i < ingredients.length; i++) {
      this.ingredient.push(ingredients[i])
      }
      this.ingredientChanged.next(this.ingredient.slice());
  }

  getEditIngredient(index : number){
    return this.ingredient[index];
  }

  UpdateIngrediemt(index : number, newIngredient : IngredientModel){
    this.ingredient[index] = newIngredient
    this.ingredientChanged.next(this.ingredient.slice());
  }

  DeleteIngredient(index : number){
    this.ingredient.splice(index,1);
    this.ingredientChanged.next(this.ingredient.slice());
  }

}
