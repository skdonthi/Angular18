import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  Directive,
  TemplateRef,
  inject,
  input,
  output,
} from '@angular/core';
import { DashboardFilter } from '../../services/dashboard.service';
import { DialogService } from '../../services/dialog.service';
import { FullScreenComponent } from '../full-screen/full-screen.component';
import { DashboardFiltersComponent } from '../dashboard-filters/dashboard-filters.component';
import { SharedModule } from '../../modules/shared.module';

@Directive({
  selector: '[xifCardHeader]',
  standalone: false,
})
export class CardHeaderDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: 'xif-card-header-actions',
  standalone: false,
})
export class CardHeaderActionsDirective {}

@Directive({
  selector: '[xifCardMainContent]',
  standalone: false,
})
export class CardContentDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'xif-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  dialogService = inject(DialogService);

  @ContentChild(CardContentDirective) cardMainContent!: CardContentDirective;
  @ContentChild(CardHeaderDirective) cardHeader!: CardHeaderDirective;

  isFleet = input<boolean>(true);
  hasActions = input<boolean>(false);
  combineDataset = input<any[]>([]);
  filterChange = output<DashboardFilter>();

  toggleFullscreen() {
    this.dialogService
      .open(FullScreenComponent, {
        template: this.cardMainContent.template,
        cardHeader: this.cardHeader.template,
        isFleet: this.isFleet,
        combineDataset: this.combineDataset,
      })
      .subscribe();
  }

  async openFiltersModal(modalTitle: string) {
    this.dialogService
      .open(DashboardFiltersComponent, {
        modalTitle: modalTitle,
        isFleet: this.isFleet,
      })
      .subscribe();
  }
}
