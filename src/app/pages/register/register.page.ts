import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  constructor(
    private storage: Storage,
    private api: ApiService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  userLogin: string;
  password: string;
  btnEnabled = true;

  async register() {
    this.btnEnabled = false;
    if (this.userLogin && this.password) {
      let body = { username: this.userLogin, password: this.password };
      await this.api
        .post('/register', body)
        .toPromise()
        .then(
          async () => {
            this.btnEnabled = true;
            await this.sharedService.showToast('Registrado com sucesso');
            await this.router.navigateByUrl('/login');
          },
          (error) => {
            this.btnEnabled = true;
          }
        );
    }
  }
}
