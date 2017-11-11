import { Injectable, Optional } from '@angular/core';

/**
* Inject as a class interface: https://angular.io/guide/dependency-injection-in-action#class-interface
*/
export abstract class StorageServiceSettings {
  storage: Storage = sessionStorage;
  timeoutSecs: number = Infinity;
}

/**
* Just the default storage settings implementation
*/
class DefaultStorageSettings extends StorageServiceSettings { }

/**
* AngularJS Service to store items into a (local or session) Storage in a generic way.
* By default, this service will log onto the `SessionStorage` with a timeout of `Infinity`.
*
* In your component, you can use the service as follows:
*
* ```
* import { StorageService } from 'app/core/storage.service';
* constructor(
* private storageService: StorageService<MyTypeHere>
* ) {}
* ```
*
* You can change default params by providing a `StorageServiceSettings` in either module or in your component.
*
* Example:
* ```
* providers: [
* {
* provide: StorageService,
* { provide: StorageServiceSettings, useValue: { storage: sessionStorage, timeoutSecs: 15 * 60 } }
* }
* ]
* ```
*/
@Injectable()
export class StorageService<T> {

  constructor( @Optional() private settings: StorageServiceSettings) {
    if (!settings) {
      this.settings = new DefaultStorageSettings();
    }
  }

  get(key: string): T | null {
    const resultJson = this.settings.storage.getItem(key);
    if (resultJson) {
      const item: StorageItem<T> = JSON.parse(resultJson);
      if (this.validate(item)) {
        return item.data;
      } else {
        // not valid anymore, no need to keep in in storage
        this.remove(key);
      }
    }
    return null;
  }
  remove(key: string): void {
    this.settings.storage.removeItem(key);
  }
  set(key: string, data: T): void {
    const item = this.createItem(data);
    this.settings.storage.setItem(key, JSON.stringify(item));
  }

  /**
  * Create a new StorageItem with a timestamp
  */
  private createItem(data: T): StorageItem<T> {
    return new StorageItem(data, new Date().getTime());
  }

  /**
  * Validates the timeout for the item
  */
  private validate(item: StorageItem<T>): boolean {
    if (this.settings.timeoutSecs === Infinity) { return true; }
    const validUntil = item.timestamp + (this.settings.timeoutSecs * 1000);
    return validUntil > new Date().getTime();
  }
}

/**
* Internal class to store items with a timestamp for timeout purposes
*/
class StorageItem<T> {
  constructor(public readonly data: T, public readonly timestamp: number) { }
}
