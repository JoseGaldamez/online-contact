import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Platform,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonNote,
  IonButton,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  createOutline,
  mailOutline,
  personCircle,
} from 'ionicons/icons';
import { DataService, ContactModel } from '../services/data.service';
import { EditContactFormComponent } from '../compenents/edit-contact-form/edit-contact-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
  imports: [
    IonTitle,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonItem,
    IonIcon,
    IonLabel,
    IonNote,
    EditContactFormComponent,
    CommonModule,
  ],
})
export class ViewMessagePage implements OnInit {
  public message!: ContactModel | undefined;
  public isEditing: boolean = false;

  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);

  constructor() {
    addIcons({ personCircle, callOutline, mailOutline, createOutline });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getContact(id);
  }

  async getContact(id: string) {
    this.message = await this.data.getMessageById(id);
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
