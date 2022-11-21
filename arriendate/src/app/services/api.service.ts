import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, Input, isDevMode, OnInit } from "@angular/core";
import {  Observable, Subject, throwError} from "rxjs";
import { map, catchError, tap } from 'rxjs/operators';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class ApiService{
    private apiURL='https://api-turismoreal.azurewebsites.net/bd'

    private _refresh$ = new Subject<void>()

    ingreso :any;

    idClient:any;
    constructor(private http: HttpClient, private router: Router){
        
    }

    get refresh$(){
        return this._refresh$
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

    getSucursal(): Observable<any>{
        return this.http.get(`${this.apiURL}/listarSuc`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    

    getArriendos(): Observable<any>{
        return this.http.get(`${this.apiURL}/listarReservas`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }),
            tap(()=>{
                this._refresh$.next()
            })
            )
            
    }

    getReservebyRut(rut:any): Observable<any>{
        return this.http.get(`${this.apiURL}/listarReservasCliente/${rut}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getEmployee(): Observable<any>{
        return this.http.get(`${this.apiURL}/listarEmps`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getDeptos(): Observable<any>{
        return this.http.get(`${this.apiURL}/listarDeptos/`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getInventario(id:any): Observable<any>{
        return this.http.get(`${this.apiURL}/infodepto/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    getServices(): Observable<any>{
        return this.http.get(`${this.apiURL}/listarServicios`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))

    }

    getClient(): Observable<any>{
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

    

    getClientId(rut_cli:any): Observable<any>{
        return this.http.get(`${this.apiURL}/listarCli/${rut_cli}`)
            
    }

    //Agregar Cliente
    newClient(RUT_CLI:any, FIRST_NAME:any, LAST_NAME:any, BIRTHDAY:any, TELEFONO:any, EMAIL:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL}/agregarCli`,{RUT_CLI:RUT_CLI, FIRST_NAME:FIRST_NAME, LAST_NAME:LAST_NAME,
             BIRTHDAY:BIRTHDAY, TELEFONO:TELEFONO, EMAIL:EMAIL},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }




    
    //Listar ultima reserva

    getLastReserve(): Observable<any>{
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

        return this.http.post<any>(`${this.apiURL}/doreserve`,{ ID_DEPTO:ID_DEPTO, ID_SUC:ID_SUC, ID_CLI:ID_CLI, MONTO_ABONADO:MONTO_ABONADO, MONTO_SERVICIOS:MONTO_SERVICIOS, DESDE:FEC_DESDE, HASTA:FEC_HASTA,  TOTAL_ARRIENDO:MONTO_TOTAL, MASCOTAS:MASCOTAS, ID_RESERVA:ID_RESERVA},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //Enviar Servicios a la base de datos
    sendService(ID_RESERVA:any, ID_SERVICIO:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL}/saveServices`,{ ID_RESERVA:ID_RESERVA, ID_SERVICIO:ID_SERVICIO},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }

    //buscar Servicios asociados a una reserva

    //Cancelar Reserva
    cancelReserve(id_reserva:any){
        let header = new HttpHeaders()
        .set('Content-type','aplication/json')

        return this.http.post<any>(`${this.apiURL}/${id_reserva}/cancel`,{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )

    }

    //Realizar Check in
    checkin(id_reserva:any,checkin:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')


        return this.http.post<any>(`${this.apiURL}/${id_reserva}/checkin`,{CHECK_IN:checkin},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }

    //Realizar Check out
    checkout(id_reserva:any,checkout:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')


        return this.http.post<any>(`${this.apiURL}/${id_reserva}/checkout`,{CHECK_OUT:checkout},{headers:header}).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            })
        )
    }
    
    //Buscar reserva por id
    getReserveByID(id:any): Observable<any>{
        return this.http.get(`${this.apiURL}/listarReservas/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error);
            }))
    }


    //Buscar depto por id

    getDeptoById(id:any): Observable<any>{
        return this.http.get(`${this.apiURL}/listarDepto/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            }),
            tap(()=>{
                this._refresh$.next()
            })
            )
    }

    //Listar ultima fecha reservada por id depto

    getLastDate(id:any): Observable<any>{
        return this.http.get(`${this.apiURL}/fechaDisponible/${id}`).pipe(
            catchError((error) =>{
                return this.errorHandler(error)
            }))
    }

    //obtener services por id
    getServicesById(id:any): Observable<any>{
        return this.http.get(`${this.apiURL}/getServices/${id}`).pipe(
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