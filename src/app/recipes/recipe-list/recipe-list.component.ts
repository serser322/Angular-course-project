import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model'
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeGot = new EventEmitter<Recipe>()
  recipes: Recipe[];
  subscription:Subscription
    
  constructor(private recipesService: RecipesService, 
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes()

    this.subscription = this.recipesService.recipesChanged
      .subscribe(
        (recipes:Recipe[]) => {
          this.recipes = recipes
        }
      )
  }

  // onGetRecipe(recipeData:Recipe){
  //   // this.recipeGot.emit(recipeData)
  //   this.recipesService.recipeSet.emit(recipeData)
  // }

  onNewRecipe(){
    this.router.navigate(['new'], { relativeTo:this.route} )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
