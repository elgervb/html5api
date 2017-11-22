import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Html5Api } from '../html5api';

@Injectable()
export class BatteryService implements Html5Api {

  charging$ = new BehaviorSubject<boolean>(false);
  level$ = new BehaviorSubject<number>(0);
  chargingTime$ = new BehaviorSubject<number>(0);
  dischargeTime$ = new BehaviorSubject<number>(0);

  battery$ = new BehaviorSubject<Battery>(null);

  private battery: Battery;

  constructor() {
    // tslint:disable-next-line no-any
    const manager = (navigator as any).getBattery();
    manager.then((battery: Battery) => {

      this.battery = battery;
      this.battery$.next(battery);

      this.charging$.next(battery.charging);
      this.level$.next(battery.level * 100);
      this.chargingTime$.next(battery.chargingTime);
      this.dischargeTime$.next(battery.dischargingTime);

      battery.addEventListener('chargingchange', () => this.charging$.next(battery.charging));
      battery.addEventListener('levelchange', () => this.level$.next(battery.level * 100));
      battery.addEventListener('chargingtimechange', () => this.chargingTime$.next(battery.chargingTime));
      battery.addEventListener('dischargingtimechange', () => this.dischargeTime$.next(battery.dischargingTime));
    });
  }

  isSupported(): boolean {
    return 'battery' in navigator;
  }
}

export interface Battery {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;

  addEventListener(event: string, callback: Function);
}
