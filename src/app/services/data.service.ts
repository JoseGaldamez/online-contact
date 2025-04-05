import { Injectable } from '@angular/core';
import { ContactModelWithoutId } from '../models/contact.model';

export interface ContactModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public contacts: ContactModel[] = [];
  private URL_BASE: string =
    'https://online-contacts-ionic-default-rtdb.firebaseio.com/';

  constructor() {}

  public getMessages(): ContactModel[] {
    return this.contacts;
  }

  async getMessageById(id: string) {
    if (this.contacts.length === 0) {
      await this.getMessagesFromFirebase();
    }

    return this.contacts.find((contact) => contact.id === id);
  }

  async getMessagesFromFirebase() {
    const response = await fetch(`${this.URL_BASE}contacts.json`);

    const responseJson = await response.json();
    const contactsIds = Object.keys(responseJson);

    let newContacts: ContactModel[] = [];

    contactsIds.forEach((id) => {
      const contact = responseJson[id];
      newContacts.push({
        ...contact,
        id: id,
      });
    });

    this.contacts = newContacts;
  }

  async addNewContact(contact: ContactModelWithoutId) {
    try {
      const response = await fetch(`${this.URL_BASE}contacts.json`, {
        method: 'POST',
        body: JSON.stringify(contact),
      });

      await response.json();
      this.getMessagesFromFirebase();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async editContact(contact: ContactModel) {
    try {
      const editigContact: ContactModelWithoutId = {
        name: contact.name,
        lastname: contact.lastname,
        email: contact.email,
        phone: contact.phone,
      };

      const response = await fetch(
        `${this.URL_BASE}contacts/${contact.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(editigContact),
        }
      );

      await response.json();
      this.getMessagesFromFirebase();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteContact(id: string) {
    try {
      const response = await fetch(`${this.URL_BASE}contacts/${id}.json`, {
        method: 'DELETE',
      });

      await response.json();
      this.getMessagesFromFirebase();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
