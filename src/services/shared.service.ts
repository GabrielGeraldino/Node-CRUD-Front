import { Injectable } from '@angular/core';
import {
  LoadingController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private popoverController: PopoverController
  ) {}

  private toast = null;
  private isLoading = false;

  async showLoading(msg?: string, interval: number = 120000) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        message: msg,
        duration: interval,
      })
      .then((load) => {
        load.present().then(() => {
          if (!this.isLoading) {
            load.dismiss(null, undefined);
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss(null, undefined);
  }

  async showToast(
    message: string,
    col: 'success' | 'danger' = 'success',
    timer?: number
  ) {
    if (this.toast) {
      this.toast.dismiss();
      this.toast = null;
    }
    this.toast = await this.toastCtrl.create({
      message,
      buttons: [{ role: 'cancel', text: 'OK' }],
      color: col,
      duration: timer | 2500,
      position: 'bottom',
    });
    this.toast.present();
  }
}
