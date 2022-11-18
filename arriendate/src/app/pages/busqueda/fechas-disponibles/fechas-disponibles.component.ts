import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-fechas-disponibles',
  templateUrl: './fechas-disponibles.component.html',
  styleUrls: ['./fechas-disponibles.component.scss'],
  
})
export class FechasDisponiblesComponent implements OnInit {

  buscarDeptoForm !: FormGroup;

  detalle : any;
  ultima_reserva:any;
  selected!: Date | null;

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buscarDeptoForm = this.fb.group({
      ID_DEPTO : new FormControl('', Validators.required)
    })
  }

  goBack(){
    this.location.back()
  }

  getLastDate(){
    if (this.buscarDeptoForm.valid){
      this.api.getLastDate(this.buscarDeptoForm.controls['ID_DEPTO'].value).subscribe({
        next:(res)=>{
          this.detalle = res
          if(this.detalle.length == 0){
            this.messageErrorDepto()
          }else{
            this.ultima_reserva = this.detalle[0].HASTA
          }
        }
      })
    }
  }

  //Message Error Check in 
  messageErrorDepto(){
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
    title: 'Ups.. Número de departamento erroneo'
    })
  }

}
