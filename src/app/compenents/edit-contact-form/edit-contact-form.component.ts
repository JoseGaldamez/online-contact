import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonItem,
  IonList,
  IonInput,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import { ContactModel } from 'src/app/models/contact.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-contact-form',
  templateUrl: './edit-contact-form.component.html',
  styleUrls: ['./edit-contact-form.component.scss'],
  imports: [IonButton, IonItem, IonList, FormsModule, IonInput],
})
export class EditContactFormComponent implements OnInit {
  @Input() contact: ContactModel = {
    id: '',
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

  async editContact() {
    console.log('Contact edited:', this.contact);
    const result = await this.dataService.editContact(this.contact);
    if (result) {
      const toast = await this.toastController.create({
        message: 'Contact edited successfully',
        duration: 2000,
        color: 'success',
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Error editing contact',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
