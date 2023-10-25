import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { IngredientModel } from 'src/app/shared/ingredient.model';
import { RecipeModel } from '../recipe.model';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {

  public Recipe : RecipeModel;
  public id : number;
  @Input() index : number;

  // @Input () Recipe : RecipeModel; 
  constructor(private shoppingListService : ShoppingListService,
              private recipeService : RecipeService,
              private route : ActivatedRoute,
              private router : Router) { }
  // private sendIngredient : IngredientModel

  ngOnInit(): void {
    this.route.params.subscribe((params : Params)=>{
      this.id = parseInt(params['id']);
      this.Recipe = this.recipeService.getSinglerecipe(this.id);
    })

    
  }

  sendToShoppingList(){
    this.shoppingListService.addIngredients(this.Recipe.ingredient);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route})

  }

}
