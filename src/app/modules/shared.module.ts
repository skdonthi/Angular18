import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardContentDirective,
  CardHeaderDirective,
} from '../components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardComponent, CardContentDirective, CardHeaderDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    CardContentDirective,
    CardHeaderDirective,
  ],
})
export class SharedModule {}
