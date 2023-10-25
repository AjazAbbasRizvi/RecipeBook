import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit , OnDestroy{
  // @Output () recipeWasSelected = new EventEmitter <RecipeModel> ();

  recipes: RecipeModel[];
  currentSubscription : Subscription;

  constructor(private recipeService: RecipeService,
              private datastorageService : DataStorageService) {}

  ngOnInit(): void {

    // this is to automatically call the get method so that we can get recipe without fecting them 
    //  this.datastorageService.fetchRecipe();

    this.currentSubscription = this.recipeService.recipeChanged.subscribe((recipe: RecipeModel[]) => {
      this.recipes = recipe;
    });
    this.recipes = this.recipeService.getrecipe();
    // console.log(this.recipes);
  }

  ngOnDestroy(): void {
      this.currentSubscription.unsubscribe();
  }

  // onRecipeSelected(recipe : RecipeModel){
  //   this.recipeWasSelected.emit(recipe);
  // }
}
