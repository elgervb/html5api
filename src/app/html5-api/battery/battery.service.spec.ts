import { TestBed, inject } from '@angular/core/testing';
import { BatteryService } from './battery.service';

describe('SpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BatteryService]
    });
  });

  it('should be created', inject([BatteryService], (service: BatteryService) => {
    expect(service).toBeTruthy();
  }));
});
