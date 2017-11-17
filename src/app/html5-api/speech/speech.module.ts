import { SpeechService } from './speech.service';
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
