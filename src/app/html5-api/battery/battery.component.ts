import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BatteryService } from './battery.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'evb-battery',
  template: `
    <div class="battery" [class.battery--horizontal]="horizontal">
      <div class="battery__fill-meter"
        [style.height.%]="horizontal ? 100 : level$|async"
        [style.width.%]="!horizontal ? 100 : level$|async"
        [class.battery__fill-meter--medium]="(level$|async) < 61"
        [class.battery__fill-meter--low]="(level$|async) < 26">
      </div>
    </div>
  `,
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent implements OnInit {
  @Input() horizontal = true;
  @HostBinding('class.battery--charging') charging;

  charging$: Observable<boolean>;
  level$: Observable<number>;

  constructor(private batteryService: BatteryService) { }

  ngOnInit() {
    this.charging$ = this.batteryService.charging$;
    this.level$ = this.batteryService.level$;

    this.charging$.subscribe(charge => this.charging = charge);
  }

}
