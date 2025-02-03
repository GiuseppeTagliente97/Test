import { HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


export function delayInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  return next(req).pipe(
    delay(1000), 
  );
}