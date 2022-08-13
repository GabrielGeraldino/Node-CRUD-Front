import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private storage: Storage) {}

  async getAuthorizationToken() {
    return await this.storage.get('token');
  }
}
