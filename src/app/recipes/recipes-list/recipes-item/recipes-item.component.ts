import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  
  @Input () recipe : RecipeModel;
  @Input () index : number;
  // @Output () recipeSelected = new EventEmitter<any>();

  // public recipe : RecipeModel;
  // public id : number;

  constructor(private recipeService : RecipeService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    

  }

  // onSelected(){
  //   // this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }

}
