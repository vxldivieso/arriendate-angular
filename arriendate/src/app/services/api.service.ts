import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode, OnInit } from "@angular/core";
import { catchError, map, Observable, throwError} from "rxjs";
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    private apiURL='https://api-turismoreal.azurewebsites.net/bd'
    ingreso :any;

    constructor(private http: HttpClient, private router: Router){
        
    }


    login(rut:any, password:any){
        return this.http.get(`${this.apiURL}/loginEmp/${rut}/${password}`).pipe(
            (map((res:any)=>{
                console.log(res[0]['ResultadoLogin']);
                this.ingreso = res[0]['ResultadoLogin']
                if(this.ingreso == 'aprobado'){
                    this.router.navigate(['home'])
                    this.messageSuccessfull()
                }

                if(this.ingreso == 'denegado'){
                    this.messageError()
                }
                

                return res;
            })))
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

<<<<<<< HEAD
    login(rut:any, password:any){
        return this.http.get(/*`${this.apiURL}*/'https://api-turismoreal.azurewebsites.net/bd/loginEmp/${rut}/${password}')
        .pipe(
=======
    getDeptos(){
        return this.http.get(`${this.apiURL}/listarDepto/`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Modulo Reservas
    doReserve(){
        return this.http.get(`${this.apiURL}/doreserve`).pipe(
>>>>>>> 361811bd13891ff87fd51b0e664b81bac418d57d
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

      //Message Successfull
        messageSuccessfull(){
            const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,   
            customClass: {
                popup: 'colored-toast'
            },
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
            Toast.fire({
            icon: 'success',
            title: 'Ingreso correcto'
            })
        }
        //Message Error
        messageError(){
            const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
            Toast.fire({
            icon: 'error',
            title: 'Ups.. Credenciales Inválidas'
            })
        }

}