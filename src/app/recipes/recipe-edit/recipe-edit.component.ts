import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  public id : number;
  public editMode = false;
  recipeForm: FormGroup;

  constructor(private route : ActivatedRoute,
              private RecipeService : RecipeService,
              private router : Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params)=>{
      // this.id = parseInt(params['id']);
      this.id = +params['id']
        this.editMode = params['id'] != null;
      this.initForm();
      // this.RecipeService.recipeChanged.subscribe();
    })


  }

  onSubmit(){
    if (this.editMode) {
      console.log(this.recipeForm.value);
      this.RecipeService.UpdateRecipe(this.id, this.recipeForm.value);
    }
    else{
      console.log(this.recipeForm.value);
      this.RecipeService.addNewRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.route});
  }

  private initForm(){

    let recipeName = ' ';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([])

    if (this.editMode) { 
      const recipe = this.RecipeService.getSinglerecipe(this.id);
      // console.log(recipe);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredient']){
        for (let Ingredient of recipe.ingredient){
          recipeIngredient.push(
            new FormGroup({
              'name' : new FormControl(Ingredient.name, Validators.required),
              'amount' : new FormControl(Ingredient.amount, Validators.required)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredient' : recipeIngredient
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name' : new FormControl(null, Validators.required),
        'amount' : new FormControl(null, Validators.required)
      }))
  }

  deleteSelectedIng(index : number){
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

  deleteAllIng(){
    (<FormArray>this.recipeForm.get('ingredient')).clear();
  }
}
