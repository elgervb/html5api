import { BatteryService } from './html5-api/battery/battery.service';
import { SpeechService } from './html5-api/speech/speech.service';
import { Component } from '@angular/core';

@Component({
  selector: 'evb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(speech: SpeechService, battery: BatteryService) {
    if (speech.isSupported() && battery.isSupported) {
      battery.level$.subscribe(level => {
        if (level === 10) {
          speech.speek(`Battery is running low. Currently at ${level} percent.`);
        }
      });
      battery.charging$.skip(2).subscribe(charging => {
        if (charging) {
          speech.speek('Battery charging');
        } else {
          speech.speek('Battery no longer charging');
        }
      });
    }
  }
}
