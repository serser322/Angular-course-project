import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
 
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private igChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients()
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (newIngredients:Ingredient[]) => {
        this.ingredients = newIngredients
      }
    )
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }

  // onAddIngredient(newIngredient:Ingredient){
  //   this.ingredients.push(newIngredient)
  // }

}
