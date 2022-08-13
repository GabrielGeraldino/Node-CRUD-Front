import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TouchSequence } from 'selenium-webdriver';
import { ApiService } from 'src/services/api.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private api: ApiService,
    private storage: Storage
  ) {}

  productById: any;
  productEdit: any;
  idGet: string;
  id: string;
  idEdit: string;

  marca: any;
  value: any;
  description: any;
  idPost: any;
  items: any;

  async listProducts() {
    await this.api
      .get('/produtos')
      .toPromise()
      .then(
        (res) => {
          this.items = res;
        },
        async (err) => {
          await this.sharedService.showToast(
            'Erro ao listar produtos',
            'danger'
          );
        }
      );
  }

  async getById() {
    await this.api
      .get(`/produtos/${this.idGet}`)
      .toPromise()
      .then(
        async (res) => {
          this.productById = res[0];
          await this.sharedService.showToast(
            'Sucesso ao recuperar produto',
            'success'
          );
        },
        async (err) => {
          await this.sharedService.showToast(
            'Erro ao recuperar produto',
            'danger'
          );
        }
      );
  }

  async editProduct() {
    await this.api
      .get(`/produtos/${this.idEdit}`)
      .toPromise()
      .then(
        async (res) => {
          this.productEdit = res[0];
          await this.sharedService.showToast(
            'Sucesso ao recuperar produto',
            'success'
          );
          await this.listProducts();
        },
        async (err) => {
          await this.sharedService.showToast(
            'Erro ao recuperar produto',
            'danger'
          );
        }
      );
  }

  async deleteProduct() {
    await this.api
      .delete(`/produtos/${this.id}`)
      .toPromise()
      .then(
        async () => {
          await this.sharedService.showToast('Deletado com sucesso', 'success');
          await this.listProducts();
        },
        async (error) => {
          await this.sharedService.showToast('Falha ao deletar', 'danger');
        }
      );
  }

  async addProduct() {
    let product = {
      id: this.idPost,
      descricao: this.description,
      valor: this.value,
      marca: this.marca,
    };

    await this.api
      .post('/produtos', product)
      .toPromise()
      .then(
        async (res) => {
          await this.sharedService.showToast(
            'Cadastrado com sucesso',
            'success'
          );
          await this.listProducts();
        },
        async (error) => {
          await this.sharedService.showToast('Falha ao cadastrar', 'danger');
        }
      );
  }

  async editProductSave() {
    await this.api
      .put(`/produtos/${this.idEdit}`, this.productEdit)
      .toPromise()
      .then(
        async (res) => {
          this.productEdit = res[0];
          await this.sharedService.showToast(
            'Sucesso ao editar produto',
            'success'
          );
          await this.listProducts();
        },
        async (err) => {
          await this.sharedService.showToast(
            'Erro ao editar produto',
            'danger'
          );
        }
      );
  }

  async sair() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }
}
