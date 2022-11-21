import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "src/app/services/spinner.service";


@Injectable({
    providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private spinner:SpinnerService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            finalize(()=> this.spinner.hide())
        )
    }

}