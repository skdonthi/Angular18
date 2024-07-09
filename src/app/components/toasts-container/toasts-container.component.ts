import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toasts-container',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  template: `@for (toast of toastService.toasts; track toast) {
    <ngb-toast
      [class]="toast.classname"
      [autohide]="autohide"
      (mouseenter)="autohide = false"
      (mouseleave)="autohide = true"
      [delay]="toast.delay || 5000"
      (hidden)="close(toast)"
      [header]="toast.header"
    >
      <ng-template [ngTemplateOutlet]="toast.template"></ng-template>
    </ngb-toast>
    } `,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsContainerComponent {
  autohide = true;

  constructor(public toastService: ToastService) {}
  close(toast: any) {
    this.toastService.remove(toast);
  }
  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
