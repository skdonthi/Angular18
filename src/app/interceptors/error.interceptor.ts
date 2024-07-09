import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastr: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        const res = event as any;
        if (res.status === 200 && res.body?.messages?.length) {
          // Handle the error response with a 200 status code
          this.handleErrorResponse(res.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastr.clear();
        if (error.status === 401) {
          this.toastr.clear();
          if (this.authService.isTokenExpired()) {
            this.toastr.error('Session expired! Please login again.');
          } else {
            this.toastr.error('Unauthorized.');
          }
          this.authService.logout();
        } else {
          const er = error.error;
          if (er.title) {
            this.toastr.error(er.title + ': ' + er.detail);
          } else {
            this.handleErrorResponse(error.error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private handleErrorResponse(errorResponse: XiErrorResponse): void {
    if (errorResponse && errorResponse.messages?.length) {
      errorResponse.messages.forEach((msg) => {
        errorResponse.success
          ? this.toastr.warning(msg.message)
          : this.toastr.error(msg.message);
      });
    }
  }
}

export interface XiErrorResponse {
  success: boolean;
  messages: Message[];
  data: null;
}

export interface Message {
  code: string;
  message: string;
  level: string;
}
