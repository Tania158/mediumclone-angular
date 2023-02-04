import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutFooterComponent],
  exports: [LayoutFooterComponent]
})
export class LayoutFooterModule {}