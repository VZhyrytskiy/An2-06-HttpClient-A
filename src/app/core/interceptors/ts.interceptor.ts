import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpEventType,
  HttpHeaders
} from '@angular/common/http';

import { Observable, filter, map } from 'rxjs';

@Injectable()
export class TsInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request Interceptor:`);

    // request interceptor
    let clonedRequest;
    if (req.method === 'POST' || (req.method === 'PUT')) {
      console.log('req.method:', req.method);
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'user-token'
        })
      });
      console.log(clonedRequest);
    } else {
      clonedRequest = req;
    }

    // response interceptor
    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpEvent<any>) => {
        // do stuff with response
        if ((event as HttpResponse<any>).url!.includes('users')) {
          console.log('Response Interceptor:');
          console.log(event);
          console.log((event as HttpResponse<any>).body);
        }
        return event;
      })
    );
  }
}
