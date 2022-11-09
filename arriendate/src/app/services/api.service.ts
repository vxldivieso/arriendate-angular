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
    private apiURL2 = 'http://localhost:8000/bd'
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

    getReservebyRut(rut:any){
        return this.http.get(`${this.apiURL2}/listarReservasCliente/${rut}`).pipe(
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

    getInventario(id:any){
        return this.http.get(`${this.apiURL}/infodepto/${id}`).pipe(
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

    deleteEmp(id_emp: any){
        return this.http.get(`${this.apiURL}/eliminarEmp/${id_emp}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    

    getClientId(rut_cli:any){
        return this.http.get(`${this.apiURL}/listarCli/${rut_cli}`)
            
    }

    //Agregar Cliente
    newClient(RUT_CLI:any, FIRST_NAME:any, LAST_NAME:any, BIRTHDAY:any, TELEFONO:any, EMAIL:any, PASSWORD:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL2}/agregarCli`,{RUT_CLI:RUT_CLI, FIRST_NAME:FIRST_NAME, LAST_NAME:LAST_NAME,
             BIRTHDAY:BIRTHDAY, TELEFONO:TELEFONO, EMAIL:EMAIL, PASSWORD:PASSWORD},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Añadir departamento

    addDepto(NOMBRE:any, DESCRIPCION:any,UBICACION:any,VALOR_DIA:any,TOTAL_PERSONAS:any,ESTACIONAMIENTO:any,MASCOTAS:any, INVENTARIO_ID:any, SUCURSAL_ID_SUC:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL2}/crearDepto`,{NOMBRE:NOMBRE, DESCRIPCION:DESCRIPCION,
        UBICACION:UBICACION,VALOR_DIA:VALOR_DIA,TOTAL_PERSONAS:TOTAL_PERSONAS, ESTACIONAMIENTO:ESTACIONAMIENTO,
        MASCOTAS:MASCOTAS, INVENTARIO_ID:INVENTARIO_ID, SUCURSAL_ID_SUC:SUCURSAL_ID_SUC},{headers:header}).pipe(
           catchError((error) =>{
               return this.errorHandler(error);
           }))

    }

    //Listar ultima reserva

    getLastReserve(){
        return this.http.get<any>(`${this.apiURL}/lastReserve`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Modulo Reservas
    //Realizar Reserva
    doReserve(ID_DEPTO:any,ID_SUC:any, ID_CLI:any, MONTO_ABONADO:any, MONTO_SERVICIOS:any,FEC_DESDE:any, FEC_HASTA:any,  MONTO_TOTAL:any, MASCOTAS:any, ID_RESERVA:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL2}/doreserve`,{ ID_DEPTO:ID_DEPTO, ID_SUC:ID_SUC, ID_CLI:ID_CLI, MONTO_ABONADO:MONTO_ABONADO, MONTO_SERVICIOS:MONTO_SERVICIOS, DESDE:FEC_DESDE, HASTA:FEC_HASTA,  TOTAL_ARRIENDO:MONTO_TOTAL, MASCOTAS:MASCOTAS, ID_RESERVA:ID_RESERVA},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Cancelar Reserva
    cancelReserve(id_reserva:any){
        let header = new HttpHeaders()
        .set('Content-type','aplication/json')

        return this.http.post<any>(`${this.apiURL2}/${id_reserva}/cancel`,{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )

    }

    //Realizar Check in
    checkin(id_reserva:any,checkin:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')


        return this.http.post<any>(`${this.apiURL2}/${id_reserva}/checkin`,{CHECK_IN:checkin},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    //Realizar Check out
    checkout(id_reserva:any,checkout:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')


    return this.http.post<any>(`${this.apiURL2}/${id_reserva}/checkout`,{CHECK_OUT:checkout},{headers:header}).pipe(
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