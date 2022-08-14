import { Component, OnInit } from '@angular/core';

import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipesService]   //若component destroy，則service instance也會跟著消失(新增資料也會消失)，所以要把service instance置於root
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
