import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesComponent } from './recipes.component';
import { SelectrecipeComponent } from './selectrecipe/selectrecipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: SelectrecipeComponent },
      { path: 'new', component: RecipeEditComponent },

      //Note - We should always put hard coded routes before the dynamic route as you can see
      //the path "new is put before the path ":id" so that from where we call the new angular dont confuse it with the id (dynamic path)

      { path: ':id', component: RecipesDetailsComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
