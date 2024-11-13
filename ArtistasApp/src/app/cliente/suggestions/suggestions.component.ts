import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent {
  @Input() sugerencias: any[] = [];
  @Output() seleccionSugerencia = new EventEmitter<any>();

  onSelect(sugerencia: any): void {
    this.seleccionSugerencia.emit(sugerencia);
  }
}
