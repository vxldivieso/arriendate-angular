import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable, isDevMode, OnInit } from "@angular/core";
import {  Observable, Subject, throwError} from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
    providedIn: 'root'
})
export class ApiUploadService{
    private apiURL='https://api-turismoreal.azurewebsites.net/bd'
    private _refresh$ = new Subject<void>()

    constructor(private http: HttpClient, private router: Router){
        
    }

    get refresh$(){
        return this._refresh$
    }
    //obtener ultimo departamento creado

    lastDepto(){
        return this.http.get(`${this.apiURL}/listarLastDepto/`).pipe(
            catchError((error) =>{
                return error;
            }))
    }


     //Añadir departamento
    createDepto(NOMBRE:any, DESCRIPCION:any,UBICACION:any,VALOR_DIA:any,TOTAL_PERSONAS:any,ESTACIONAMIENTO:any,MASCOTAS:any,
        SUCURSAL_ID_SUC:any, ESTADO_DEPTO:any, CAMA_2PL:any, CAMA_1PL:any, COCINA:any, REFRIGERADOR:any, INTERNET:any, 
        TV_CABLE:any, CANT_TV_DEPTO:any, COMENTARIOS:any, FOTO1:any, FOTO2:any, FOTO3:any, FOTO4:any, 
        DEPARTAMENTO_ID_DEPTO:any, DEPARTAMENTO_SUCURSAL_ID_SUC:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')

        return this.http.post<any>(`${this.apiURL}/crearDepto`,{NOMBRE:NOMBRE, DESCRIPCION:DESCRIPCION,
        UBICACION:UBICACION,VALOR_DIA:VALOR_DIA,TOTAL_PERSONAS:TOTAL_PERSONAS, ESTACIONAMIENTO:ESTACIONAMIENTO,
        MASCOTAS:MASCOTAS, SUCURSAL_ID_SUC:SUCURSAL_ID_SUC, ESTADO_DEPTO:ESTADO_DEPTO, CAMA_2PL:CAMA_2PL, CAMA_1PL:CAMA_1PL,
        COCINA:COCINA, REFRIGERADOR:REFRIGERADOR, INTERNET:INTERNET, TV_CABLE:TV_CABLE, CANT_TV_DEPTO:CANT_TV_DEPTO,
        COMENTARIOS:COMENTARIOS, FOTO1:FOTO1, FOTO2:FOTO2, FOTO3:FOTO3, FOTO4:FOTO4, DEPARTAMENTO_ID_DEPTO:DEPARTAMENTO_ID_DEPTO,
        DEPARTAMENTO_SUCURSAL_ID_SUC:DEPARTAMENTO_SUCURSAL_ID_SUC},{headers:header}).pipe(
           catchError((error) =>{
               return error;
           }))

    }


    updateDeptoInventario(ID_DEPTO:any, FOTO1:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')
        return this.http.patch(`${this.apiURL}/updateDepto/${ID_DEPTO}`, {FOTO1:FOTO1},{headers:header}).pipe(
            catchError((error) =>{
                return error
            }))
    }

    updateStateDepto(ID_DEPTO:any, FOTO1:any,FOTO2:any, FOTO3:any, FOTO4:any, COMENTARIOS:any, DATE:any, ID_RESERVA:any){
        let header = new HttpHeaders()
        .set('Type-content','aplication/json')
        return this.http.post(`${this.apiURL}/updateStateDepto`,{ID_DEPTO:ID_DEPTO, FOTO1:FOTO1, FOTO2:FOTO2, FOTO3:FOTO3,
            FOTO4:FOTO4,COMENTARIOS:COMENTARIOS, DATE:DATE, ID_RESERVA:ID_RESERVA},{headers:header}).pipe(
                catchError((error) =>{
                    return error
                }))
    }
}