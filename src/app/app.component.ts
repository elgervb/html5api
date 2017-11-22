import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { BatteryService } from './html5-api/battery/battery.service';
import { SpeechService } from './html5-api/speech/speech.service';

@Component({
  selector: 'evb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  private unsubscribe = new Subject();

  constructor(private speech: SpeechService, private battery: BatteryService) { }

  ngOnInit() {
    if (this.speech.isSupported() && this.battery.isSupported) {
      this.battery.level$
        .takeUntil(this.unsubscribe)
        .filter(level => level === 10)
        .subscribe(level => {
          this.speech.speek(`Battery is running low. Currently at ${level} percent.`);
        });

      this.battery.charging$.skip(2).subscribe(charging => {
        if (charging) {
          this.speech.speek('Battery charging');
        } else {
          this.speech.speek('Battery no longer charging');
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();

  }
}
