import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes : Routes = [

  {path : '', redirectTo : '/recipe', pathMatch: 'full'},
  
  {path : 'shoppingList', component : ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
  {path : 'recipe', loadChildren: ()=>import('./recipes/recipe.module').then(m=> m.RecipeModule)},
] 

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
