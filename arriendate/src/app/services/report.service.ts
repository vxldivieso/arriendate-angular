import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode, OnInit } from "@angular/core";
import {  Observable, throwError} from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class ApiReportService{
    private apiURL='http://localhost:8000/bd'
   
    constructor(private http: HttpClient, private router: Router){
        
    }

    //Get pagos
    getPagos(){
        return this.http.get(`${this.apiURL}/listarPagos`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

   
    errorHandler(error:HttpErrorResponse){
        if(error instanceof HttpErrorResponse){
            if(error.error instanceof ErrorEvent){
                console.log('Client Error');
            }else{
                console.log('Service Error');
            }
        }else{
            console.log('Other Type');
            
        }
        return throwError(error)
    }


}