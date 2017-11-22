import {
  DesktopNotificationsService,
} from './html5-api/desktop-notification/desktop-notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { BatteryService } from './html5-api/battery/battery.service';
import { SpeechService } from './html5-api/speech/speech.service';
import { PagevisibilityService } from './html5-api/page-visibility/page-visibility.service';

@Component({
  selector: 'evb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  private unsubscribe = new Subject();

  constructor(
    private speech: SpeechService,
    private battery: BatteryService,
    private visibility: PagevisibilityService,
    private notification: DesktopNotificationsService
  ) { }

  ngOnInit() {

    this.battery.battery$
      .filter(battery => !!battery)
      .takeUntil(this.unsubscribe)
      .subscribe(battery => {
        this.notifyUser();
      });

    if (this.visibility.isSupported()) {
      Observable.combineLatest(this.battery.charging$, this.visibility.visiblity$, (level, visibility) => {
        console.log(level, visibility);
      }).subscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private notifyUser() {
    this.battery.level$
      .takeUntil(this.unsubscribe)
      .filter(level => level === 10 || level === 5)
      .subscribe(level => {
        if (this.speech.isSupported()) {
          this.speech.speek(`Battery is running low. Currently at ${level} percent.`);
        }
        if (this.notification.isSupported() && this.visibility.isSupported() && this.visibility.visible === false) {
          this.notification.create(`Battery is running low. Currently at ${level} percent.`, 'Battery level');
        }
      });

    this.battery.charging$.skip(2).subscribe(charging => {
      if (this.speech.isSupported()) {
        this.speech.speek(charging ? 'Battery charging' : 'Battery no longer charging');
      }
      if (this.notification.isSupported() && this.visibility.isSupported() && this.visibility.visible === false) {
        this.notification.create(charging ? 'Battery charging' : 'Battery no longer charging', 'Battery');
      }
    });
  }
}
