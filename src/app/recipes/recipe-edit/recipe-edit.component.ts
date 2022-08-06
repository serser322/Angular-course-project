import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeName:string
  editMode = false
  recipeForm:FormGroup

  constructor(private route:ActivatedRoute ,
              private recipesService: RecipesService,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipeName = params['recipeName'];
          this.editMode = params['recipeName'] != null  //判斷是edit或是new  // '!==' 確認是否為null ; '!='確認是否為null或undefined
          this.initForm() //切換router時就重新取得資料，故放在route裡
        }
      )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      let recipeData = this.recipesService.getRecipe(this.recipeName)
      recipeName = this.recipeName;
      recipeImagePath = recipeData.imagePath
      recipeDescription = recipeData.description
      if(recipeData['ingredients']){  //若無ingredients，則回傳undefined
        for (let ingredient of recipeData.ingredients){
          recipeIngredients.push(
            new FormGroup ({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount':new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeImagePath, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  getIngredientControls(){
    // console.log(<FormArray>this.recipeForm.get('ingredients'));
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit(){
    // const newRecipe = new Recipe (
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['ingredients'])

    if(this.editMode){
      // this.recipesService.updateRecipe(this.recipeName , newRecipe )
      this.recipesService.updateRecipe(this.recipeName , this.recipeForm.value )  //recipeForm.value與Recipe相同格式
    }else{
      this.recipesService.addRecipe(this.recipeForm.value)
    }
    this.router.navigate(['../'],{ relativeTo:this.route })
  }

  onCancel(){
    this.router.navigate(['../'],{ relativeTo:this.route })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(  //FormArray的push method (而非一般的array push())，能對FormArray中的controls作push
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
