import { Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector:'app-header',
  templateUrl:'./header.component.html'
})

export class HeaderComponent{
  @Output() featureSelected = new EventEmitter<string>();

  collapsed = true;
  expanded = false;

  constructor(){}

  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }

  toggleDropdown(){
    this.expanded = ! this.expanded
  }
}