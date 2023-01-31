import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { FollowButtonService } from './services/followButton.service';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { FollowButtonEffect } from "./store/effects/followButton.effect";

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([FollowButtonEffect]), ReactiveFormsModule],
  declarations: [FollowButtonComponent],
  exports: [FollowButtonComponent],
  providers: [FollowButtonService]
})
export class FollowButtonModule {

}