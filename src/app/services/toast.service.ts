import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  toasts: any[] = [];

  success(textOrTpl: string, options: any = {}) {
    this.toasts.push({
      textOrTpl,
      header: 'Success!',
      classname: 'bg-success text-light',
      delay: 3000,
      ...options,
    });
  }

  error(textOrTpl: string, options: any = {}) {
    this.toasts.push({
      textOrTpl,
      header: 'Error!',
      classname: 'bg-danger text-light',
      delay: 5000,
      ...options,
    });
  }

  warning(textOrTpl: string, options: any = {}) {
    this.toasts.push({
      textOrTpl,
      header: 'Warning!',
      classname: 'bg-warning',
      delay: 5000,
      ...options,
    });
  }

  showEscape() {
    this.toasts.push({
      textOrTpl: "Use 'ESC' (escape) key to exit fullscreen mode",
      classname: 'bg-dark text-light',
      delay: 3000,
    });
  }

  remove(toast: any) {
    this.toasts = (this.toasts || []).filter((t) => t !== toast);
  }

  clear() {
    (this.toasts || []).splice(0, (this.toasts || []).length);
  }
}
