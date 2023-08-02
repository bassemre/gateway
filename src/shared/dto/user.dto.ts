import { AddressDTO } from './address.dto'; //mport { ObjectID } from 'typeorm';
export interface UserDTO {
  id: string; // ObjectID;
  name: string;
  readonly password: string;
  seller: boolean;
  address: AddressDTO;
  created_at: Date;
}
