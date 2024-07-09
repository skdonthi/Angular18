import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbAccordionModule,
  NgbAlertModule,
  NgbDropdownModule,
  NgbDatepickerModule,
  NgbNavModule,
  NgbPopoverModule,
  NgbTimepickerModule,
  NgbToastModule,
  NgbTooltipModule,
  NgbModalModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModalModule,
    NgbNavModule,
    NgbPopoverModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbTooltipModule,
  ],
  exports: [
    NgbAccordionModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModalModule,
    NgbNavModule,
    NgbPopoverModule,
    NgbTimepickerModule,
    NgbToastModule,
    NgbTooltipModule,
  ],
})
export class BootstrapModule {}
