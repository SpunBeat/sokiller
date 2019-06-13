import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatTabsModule,
  MatListModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressBarModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatDialogModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRippleModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatTabsModule,
  MatListModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDividerModule,
  MatStepperModule,
  MatProgressBarModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...modules],
  exports: [...modules],
  providers: []
})
export class MaterialModule {}
