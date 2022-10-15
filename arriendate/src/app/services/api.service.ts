import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode, OnInit } from "@angular/core";
import { catchError, map, Observable, throwError} from "rxjs";
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn:'root'
}) 
export class ApiService{
    private apiURL='https://api-turismoreal.azurewebsites.net/bd'

    constructor(private http: HttpClient){
        
    }

    getEmployee(){
        return this.http.get(`${this.apiURL}/listarEmps`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    login(rut:any, password:any){
        return this.http.get(`${this.apiURL}/loginEmp/:${rut}/:${password}`)
        .pipe(
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