import { SpeechModule } from './html5-api/speech/speech.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BatteryModule } from './html5-api/battery/battery.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BatteryModule,
    SpeechModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
