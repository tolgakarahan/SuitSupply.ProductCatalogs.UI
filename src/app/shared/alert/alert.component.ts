import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() messages: string[];
  @Input() isConfirmationAlert: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirmed(){
    this.confirmed.emit();
  }

  onCanceled(){
    this.canceled.emit();
  }


}
