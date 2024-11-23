import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Modal';
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }
}
