import { SpeechService } from './speech.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SpeechService
  ]
})
export class SpeechModule { }
