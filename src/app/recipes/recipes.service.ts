import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Ingredient } from "../shared/ingredient.model"
import { ShoppingListService } from "../shopping-list/shopping-list.service"
import { Recipe } from "./recipe.model"

@Injectable({providedIn:'root'})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

 //告訴recipes，其值是一個裡面裝了Recipe型態物件的陣列
  private recipes: Recipe[] = [
    new Recipe(
        'Recipe1', 
        'This is a test description.', 
        'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/10/21/0/14375575.jpg',
        [
          new Ingredient('Buns',2), 
          new Ingredient('Meat',3)
        ]
      ),
    new Recipe(
        'Recipe2', 
        'This is a test description2', 
        'https://i.ytimg.com/vi/ZmACG5rQBYg/maxresdefault.jpg',
        [
          new Ingredient('chicken',3), 
          new Ingredient('apples',3), 
          new Ingredient('vegetable',4)
        ]
      )
  ]

  constructor(private shoppingListService: ShoppingListService){}

  currentRecipe:Recipe
  recipeSet = new Subject<Recipe>()

  getRecipes(){
    return this.recipes.slice() //copy array
  }

  getRecipe(recipeName:string){
    return this.recipes.find( recipe => recipe.name === recipeName )
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(recipeName:string, newRecipe:Recipe){
    const index = this.recipes.findIndex( recipe => recipe.name === recipeName )
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(recipeName:string){
    const index = this.recipes.findIndex( recipe => recipe.name === recipeName )
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }

}