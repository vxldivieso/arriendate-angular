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


    obtener_localstorage(){

    }

    login(rut:any, password:any){
        return this.http.get(`${this.apiURL}/loginEmp/${rut}/${password}`).pipe(
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
        return this.http.get(`${this.apiURL}/listarSuc`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getReserveByID(id:any){
        return this.http.get(`${this.apiURL}/listarReservas/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getArriendos(){
        return this.http.get(`${this.apiURL}/listarReservas`).pipe(
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

    getServices(){
        return this.http.get(`${this.apiURL}/listarServicios`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getClient(){
        return this.http.get(`${this.apiURL}/listarCli`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    //Listar clientes para Administracion
    getClient2(){
        return this.http.get(`${this.apiURL}/listarCli2`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    getClientId(rut_cli:any){
        return this.http.get(`${this.apiURL}/listarCli/${rut_cli}`)
            
    }

    //Agregar Cliente
    newClient(data:any){
        return this.http.post<any>(`${this.apiURL}/agregarCli`,{data:data}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //

    //Modulo Reservas
    //Realizar Reserva
    doReserve(data:any){
        return this.http.post<any>(`${this.apiURL}/doreserve`,{reserva:data}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Cancelar Reserva
    cancelReserve(id_reserva:any, estado:any){
        return this.http.post<any>(`${this.apiURL}/${id_reserva}/cancel`,{estado:estado}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )

    }

    //Realizar Check in
    checkin(id_reserva:any,checkin:any){
        let header = new HttpHeaders()
        return this.http.post<any>(`${this.apiURL}/${id_reserva}/checkin`,{checkin:checkin}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    //Realizar Check out
    checkout(id_reserva:any,checkout:any){
    return this.http.post<any>(`${this.apiURL}/${id_reserva}/checkout`,{checkout:checkout}).pipe(
        catchError((error) =>{
            return this.errorHandler(error)
        })
    )
    }

    //Buscar depto por id

    getDeptoById(id:any){
        return this.http.get(`${this.apiURL}/listarDepto/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            }))
    }

    //Listar ultima fecha reservada por id depto

    getLastDate(id:any){
        return this.http.get(`${this.apiURL}/fechaDisponible/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
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