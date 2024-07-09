import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, inject, input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'xif-full-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss'],
})
export class FullScreenComponent {
  @Input() template!: TemplateRef<any>;
  @Input() cardHeader!: TemplateRef<any>;
  combineDataset = input<any[]>([]);
  activeModal = inject(NgbActiveModal);
}
