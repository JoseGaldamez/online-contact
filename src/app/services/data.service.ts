import { Injectable } from '@angular/core';

export interface ContactModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  id: string;
}

export type ContactModelWithoutId = Omit<ContactModel, 'id'>;

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
      const response = await fetch(`${this.URL_BASE}contact.json`, {
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
}
