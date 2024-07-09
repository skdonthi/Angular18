import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(MatDialog);
  localConfig: any = {
    disableClose: true,
    width: '1140px',
    height: 'auto',
    position: { top: '3%' },
  };

  constructor() {}

  open<T = any, R = any>(
    compRef: ComponentType<T>,
    data: any,
    dialogConfig?: MatDialogConfig
  ): Observable<MatDialogRef<T, R>> {
    return this.dialog
      .open(compRef, {
        ...this.localConfig,
        ...dialogConfig,
        data,
      })
      .afterClosed();
  }
}
