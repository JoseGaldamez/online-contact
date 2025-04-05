import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonList,
  IonInput,
  IonButton,
  IonItem,
  ToastController,
} from '@ionic/angular/standalone';
import { ContactModelWithoutId } from 'src/app/models/contact.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-new-contact-form',
  templateUrl: './new-contact-form.component.html',
  styleUrls: ['./new-contact-form.component.scss'],
  imports: [IonItem, IonList, IonInput, IonButton, IonItem, FormsModule],
})
export class NewContactFormComponent implements OnInit {
  contact: ContactModelWithoutId = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
  };

  constructor(
    private dataService: DataService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async addContact() {
    console.log('Contact added:', this.contact);
    const result = await this.dataService.addNewContact(this.contact);

    if (result) {
      this.contact = {name: '',lastname: '',email: '',phone: '',};
      const toast = await this.toastController.create({
        message: 'Contact added successfully',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Error adding contact',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
