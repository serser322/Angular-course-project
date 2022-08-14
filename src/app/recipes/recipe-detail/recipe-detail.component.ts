import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model'
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeData:Recipe

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    // const recipeName = this.route.snapshot.params['recipeName']
    

    this.route.params
      .subscribe(
        (params: Params) => {
          // this.recipeName = params['recipeName']
          this.recipeData = this.recipesService.getRecipe(params['recipeName'])
        }
      )

  }

  onAddToShoppingList(){
    this.recipesService.addIngredientsToShoppingList(this.recipeData.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'] , { relativeTo:this.route } )
    // this.router.navigate(['../', this.recipeName, 'edit'], { relativeTo:this.route})
  }

  onDelete(){
    this.recipesService.deleteRecipe(this.recipeData['name'])
    this.router.navigate(['../'], { relativeTo:this.route })
  }
}
