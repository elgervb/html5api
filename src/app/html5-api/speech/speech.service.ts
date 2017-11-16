import { Injectable } from '@angular/core';
import { Html5Api } from '../html5api';

@Injectable()
export class SpeechService implements Html5Api {

  private defaultVoice: SpeechSynthesisVoice;
  private defaultPitch = 1;
  private defaultRate = 1;

  constructor() { }

  getVoices(): SpeechSynthesisVoice[] {
    return window.speechSynthesis.getVoices();
  }

  setDefaultVoice(voice: SpeechSynthesisVoice, pitch = 1, rate = 1) {
    this.defaultVoice = voice;
    this.defaultPitch = pitch;
    this.defaultRate = rate;
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  speek(message: string, voice?: SpeechSynthesisVoice, pitch?: number, rate?: number) {
    const utter = new SpeechSynthesisUtterance(message);
    utter.voice = voice || this.defaultVoice;
    utter.pitch = pitch || this.defaultPitch;
    utter.rate = rate || this.defaultRate;

    window.speechSynthesis.speak(utter);
  }
}
