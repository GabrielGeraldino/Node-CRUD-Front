import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  constructor(
    private storage: Storage,
    private api: ApiService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  userLogin: string;
  password: string;
  btnEnabled = true;

  async login() {
    this.btnEnabled = false;
    if (this.userLogin && this.password) {
      let body = { username: this.userLogin, password: this.password };
      await this.api
        .post('/login', body)
        .toPromise()
        .then(
          async (res: any) => {
            this.btnEnabled = true;
            await this.sharedService.showToast('Logado com sucesso');
            await this.storage.set('token', res.token);
            await this.router.navigateByUrl('/home');
          },
          (error) => {
            this.btnEnabled = true;
          }
        );
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
