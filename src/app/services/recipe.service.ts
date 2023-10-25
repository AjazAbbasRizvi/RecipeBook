import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeModel } from '../recipes/recipe.model';
import { IngredientModel } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  public recipeChanged = new Subject<RecipeModel[]> ();

  public recipeSelected = new Subject<RecipeModel> ();

 private  recipes : RecipeModel[] =[
    // new RecipeModel('Butter Chicken', 'This is a Butter Chicken test', 
    // 'https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken-.jpg',[
    //   new IngredientModel("Chicken", 1),
    //   new IngredientModel("Butter", 1),
    //   new IngredientModel("Onion", 5),
    // ]),
  
    // new RecipeModel('Kadhai Paneer', 'This is a Kadhai Paneer', 
    // 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg',[
    //   new IngredientModel("Paneer", 1),
    //   new IngredientModel("Capsicum", 5),
    // ])
  ];

  setRecipes(recipe : RecipeModel[]){
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getrecipe(){
    return this.recipes.slice();
  }

  getSinglerecipe(index : number){
    return this.recipes[index];
  }

  addNewRecipe(recipe : RecipeModel){
    this.recipes.push(recipe);
    console.log(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  UpdateRecipe(index : number, newRecipe : RecipeModel){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index : number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
