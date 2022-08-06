import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs'
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn:'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    // new Ingredient('Apples', 5),
    // new Ingredient('tomatos',10)
  ]

  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  getIngredients(){
    return this.ingredients.slice()
  }

  getIngredient(index:number){
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}