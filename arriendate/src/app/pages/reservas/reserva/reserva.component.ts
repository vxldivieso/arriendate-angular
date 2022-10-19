import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  reserveForm !: FormGroup;
  deptos_detalle :any;
  sucursales : any;

  datosReserva !: String[];
  mascotas : String[] = [ 'Si', 'No']
  sucursal !: String [];


  today = new Date();
  
  constructor(private acroute: ActivatedRoute, private location : Location, private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.reserveForm = this.fb.group({
      id_reserva : new FormControl(''),
      rut : new FormControl(''),
      id_sucursal : new FormControl(''),
      id_depto : new FormControl(''),
      fec_desde: new FormControl<Date | null>(null),
      fec_hasta: new FormControl<Date | null>(null),
      mascotas : new FormControl(Boolean),
      cantpersonas : new FormControl(Number),
      priceDepto : new FormControl(''),
      total_reserva : new FormControl(''),
      monto_abonado : new FormControl(''),
      monto_servicios : new FormControl(''),
      fec_reserva : new FormControl(Date),
      id_detalle_reserva : new FormControl(''),
    })
    this.getDeptos()
    this.getSucursal()
  }

  goBack(){
    this.location.back()
  }

  getDeptos(){
    this.api.getDeptos().subscribe({
      next:(res)=>{
        Object.entries(res).forEach(([key, value]) => {
          this.deptos_detalle = value;
        });
      }
    })
  }

  getSucursal(){
    this.api.getSucursal().subscribe({
      next:(res)=>{
        Object.entries(res).forEach(([key, value]) => {
          this.sucursales = value;
        });
      }
    })
  }

  onSubmit(){
    this.datosReserva = this.reserveForm.value;
    if (this.reserveForm.valid){
      this.api.doReserve(this.datosReserva).subscribe({
        next:(res)=>{
          this.sucursales = res;
          console.log(typeof res);
        }
      })
    }
  }

  sumServicios(){

  }


}
