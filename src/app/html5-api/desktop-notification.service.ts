import { Injectable, Optional } from '@angular/core';

export abstract class DesktopNotificationsSettings {
  icon: string;

}

/**
*
* https://developer.mozilla.org/en-US/docs/Web/API/notification
*/
@Injectable()
export class DesktopNotificationsService {
  private icon: string;

  constructor( @Optional() settings: DesktopNotificationsSettings) {
    if (settings) {
      this.icon = settings.icon;
    }
  }

  setDefaultIcon(iconPath: string): void {
    this.icon = iconPath;
  }

  isSupported(): boolean {
    return 'Notification' in window;
  }

  checkHasPermission(): boolean {
    return this.getPermission() === 'granted';
  }

  requestPermission(callback?: NotificationPermissionCallback): void {
    if (this.isSupported()) {
      Notification.requestPermission(callback);
    }
  }

  create(message: string, title: string = '', iconPath?: string): Notification {
    if (this.isSupported()) {
      if (this.getPermission() === 'granted') {
        return this.createNotification(message, title, iconPath);
      } else if (this.getPermission() !== 'denied') {
        this.requestPermission(() => {
          return this.createNotification(message, title, iconPath);
        });
      } else {
        console.warn('Desktop notifications has been denied');
      }
    }
  }

  private createNotification(message: string, title?: string, iconPath?: string): Notification {
    const notification = new Notification(title, { body: message, icon: iconPath ? iconPath : this.icon });
    return notification;
  }

  private getPermission(): string {
    /* tslint:disable no-any */
    return (Notification as any).permission;
    /* tslint:enable no-any */
  }
}
