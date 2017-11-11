import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { BatteryService } from './battery.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatteryComponent } from './battery.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BatteryComponent
  ],
  providers: [
    BatteryService
  ],
  exports: [
    BatteryComponent
  ]
})
export class BatteryModule { }
