import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeModel } from '../recipes/recipe.model';
import { AuthService } from '../services/auth.service';
import { RecipeService } from '../services/recipe.service';
import { ShoppingListService } from '../services/shopping-list.service';
import { IngredientModel } from './ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private Http: HttpClient,
    public recipeService: RecipeService,
    public shoppingListService: ShoppingListService,
    public authSerive: AuthService
  ) {}

  storeRecipe() {
    const recipe = this.recipeService.getrecipe();
    this.Http.put(
      'https://recipebook-a6174-default-rtdb.firebaseio.com/recipes.json',
      recipe
    ).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipe() {
    
    return this.Http.get<RecipeModel[]>('https://recipebook-a6174-default-rtdb.firebaseio.com/recipes.json').pipe(map((recipes)=>{
      return recipes.map((recipes)=>{
        return {...recipes,  ingredient: recipes.ingredient ? recipes.ingredient : [],};
      });
    }), tap((recipes)=>{
      this.recipeService.setRecipes(recipes);
    }))
  }
}
