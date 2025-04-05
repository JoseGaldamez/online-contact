export interface ContactModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  id: string;
}

export type ContactModelWithoutId = Omit<ContactModel, 'id'>;
