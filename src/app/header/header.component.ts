import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../shared/data-storageService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  collapsed = true;
  expanded = false;

  constructor(private dataStorageService: DataStorageService) {}

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  toggleDropdown() {
    this.expanded = !this.expanded;
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
