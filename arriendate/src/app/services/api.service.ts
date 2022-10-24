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

    idClient:any;

    constructor(private http: HttpClient, private router: Router){
        
    }


    login(rut:any, password:any){
        return this.http.get(`/v3/loginEmp/${rut}/${password}`).pipe(
            (map((res:any)=>{
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
        return this.http.get(`/v3/listarSuc`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getReserveByID(id:any){
        return this.http.get(`/v3/listarReservas/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }
    
    getEmployee(){
        return this.http.get(`/v3/listarEmps`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getDeptos(){
<<<<<<< HEAD
        return this.http.get(`/v3/listarDepto/`).pipe(
=======
        return this.http.get(`${this.apiURL}/listarDepto`).pipe(
>>>>>>> 05654b6eb30d21eb0c82177bb81570c9fa01a8f5
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

<<<<<<< HEAD
    getServices(){
        return this.http.get(`/v3/listarServicios`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getClient(){
        return this.http.get(`/v3/listarCli`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    getClientId(rut_cli:any){
        return this.http.get(`/v3/listarCli/${rut_cli}`)
            
    }

    //Agregar Cliente
    newClient(data:any){
        return this.http.post<any>(`/v3/agregarCli`,{data:data}).pipe(
=======
    getArriendos(){
        return this.http.get(`${this.apiURL}/listarReservas`).pipe(
>>>>>>> 05654b6eb30d21eb0c82177bb81570c9fa01a8f5
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Modulo Reservas
    //Realizar Reserva
    doReserve(data:any){
        return this.http.post<any>(`/v3/doreserve`,{reserva:data}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Cancelar Reserva
    cancelReserve(id_reserva:any, estado:any){
        return this.http.post<any>(`/v3/${id_reserva}/cancel`,{estado:estado}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )

    }

    //Realizar Check in
    checkin(id_reserva:any,checkin:any){
        return this.http.post<any>(`/v3/${id_reserva}/checkin`,{checkin:checkin}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    //Realizar Check out
    checkout(id_reserva:any,checkout:any){
    return this.http.post<any>(`/v3/${id_reserva}/checkout`,{checkout:checkout}).pipe(
        catchError((error) =>{
            return this.errorHandler(error)
        })
    )
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