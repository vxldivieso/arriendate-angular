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


    login(rut:any, password:any){
        return this.http.get(`/v3/loginEmp/:${rut}/:${password}`)
        .pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getSucursal(){
        return this.http.get(`${this.apiURL}/listarSuc`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }
    
    getEmployee(){
        return this.http.get(`${this.apiURL}/listarEmps`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getDeptos(){
        return this.http.get(`${this.apiURL}/listarDepto/`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Modulo Reservas
    doReserve(){
        return this.http.get(`${this.apiURL}/doreserve`).pipe(
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