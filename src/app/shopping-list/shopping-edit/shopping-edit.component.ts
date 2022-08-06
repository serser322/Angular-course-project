import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form',{ static:false }) shoppingEditingForm:NgForm;
  subscription:Subscription
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient

  // @ViewChild('nameInput', { static:false }) nameInputRef:ElementRef
  // @ViewChild('amountInput', { static:false }) amountInputRef:ElementRef

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index:number) => {
          this.editMode = true;
          this.editedItemIndex = index
          this.editedItem = this.shoppingListService.getIngredient(index)
          this.shoppingEditingForm.setValue({
            name:this.editedItem.name,
            amount:this.editedItem.amount
          })
        }
      )
  }

  onSubmit(formData:NgForm){
    const newIngredient = new Ingredient(formData.value.name, formData.value.amount)
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }else{
      this.shoppingListService.addIngredient(newIngredient)
    }

    formData.reset()
    this.editMode = false
  }

  onClear(){
    this.shoppingEditingForm.reset();
    this.editMode = false
  }

  onDelete(){
    this.onClear()
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
