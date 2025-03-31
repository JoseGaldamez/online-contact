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
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';

import { DataService, ContactModel } from '../services/data.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
    MessageComponent,
  ],
})
export class HomePage {
  private data = inject(DataService);
  private router = inject(NavController);
  constructor() {
    addIcons({ add });
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
}
