import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Html5Api } from '../html5api';

@Injectable()
export class PagevisibilityService implements Html5Api {

  visiblity$: Observable<boolean>;

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private hiddenAttr;

  constructor() {
    this.visiblity$ = this.subject.asObservable();

    let visibilityChange;
    if ('hidden' in document) {
      this.hiddenAttr = 'hidden';
      visibilityChange = 'visibilitychange';
    } else if ('mozHidden' in document) {
      this.hiddenAttr = 'mozHidden';
      visibilityChange = 'mozvisibilitychange';
    } else if ('msHidden' in document) {
      this.hiddenAttr = 'msHidden';
      visibilityChange = 'msvisibilitychange';
    } else if ('webkitHidden' in document) {
      this.hiddenAttr = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
    }

    document.addEventListener(visibilityChange, this.handleVisibilityChange.bind(this), false);
    this.handleVisibilityChange();
  }

  isSupported(): boolean {
    return !!this.hiddenAttr;
  }

  get visible(): boolean {
    return !document[this.hiddenAttr];
  }

  private handleVisibilityChange() {
    this.subject.next(this.visible);
  }

}
