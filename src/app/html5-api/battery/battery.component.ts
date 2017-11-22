import { Component, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BatteryService } from './battery.service';

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
export class BatteryComponent implements OnInit, OnDestroy {
  @Input() horizontal = true;
  @HostBinding('class.battery--charging') charging;

  charging$: Observable<boolean>;
  level$: Observable<number>;

  private unsubscribe = new Subject();

  constructor(private batteryService: BatteryService) { }

  ngOnInit() {
    this.charging$ = this.batteryService.charging$;
    this.level$ = this.batteryService.level$;

    this.charging$
      .takeUntil(this.unsubscribe)
      .subscribe(charge => this.charging = charge);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
