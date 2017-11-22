import { DesktopNotificationModule } from './html5-api/desktop-notification/desktop-notification.module';
import { PageVisibilityModule } from './html5-api/page-visibility/page-visibility.module';
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
    SpeechModule,
    PageVisibilityModule,
    DesktopNotificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
