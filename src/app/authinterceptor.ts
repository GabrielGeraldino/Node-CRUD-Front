import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { modalController } from '@ionic/core';
import { UserService } from 'src/services/user.service';
import { SharedService } from 'src/services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: UserService,
    public router: Router,
    private sharedService: SharedService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    try {
      return from(this.auth.getAuthorizationToken()).pipe(
        switchMap((authToken) => {
          const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken),
          });

          return next.handle(authReq).pipe(
            tap(
              (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
              },
              async (error: any) => {}
            )
          );
        })
      );
    } catch {
      console.error('Erro ao pegar token');
    }
  }
}
