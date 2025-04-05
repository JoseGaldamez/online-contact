import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
  IonItemSliding,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, ContactModel } from '../services/data.service';
import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonLabel,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonFabButton,
    IonFab,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    IonItemSliding,
    MessageComponent,
  ],
})
export class HomePage {
  private data = inject(DataService);
  private router = inject(NavController);

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({ add, trashOutline });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): ContactModel[] {
    return this.data.getMessages();
  }

  goToCreateNewContact() {
    this.router.navigateForward(['new-contact']);
  }

  async mostrarAlerta(id: string) {
    const alert = await this.alertController.create({
      header: 'Eliminar contacto',
      message: '¿Quieres eliminar este contacto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            console.log('Contacto eliminado', id);
            const result = await this.data.deleteContact(id);
            if (result) {
              const toast = await this.toastController.create({
                message: 'Contacto eliminado',
                duration: 2000,
                color: 'success',
              });
              toast.present();
            } else {
              const toast = await this.toastController.create({
                message: 'Error al eliminar contacto',
                duration: 2000,
                color: 'danger',
              });
              toast.present();
            }
          },
        },
      ],
    });

    alert.present();
  }
}
