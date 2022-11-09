import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  searchReserveForm!: FormGroup;
  reserva : any;
  format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  today = moment().format() ;

  constructor(private acroute: ActivatedRoute, private location : Location, private fb : FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.searchReserveForm = this.fb.group({
      ID_RESERVA : new FormControl('', Validators.required )
    })
  }

  goBack(){
    this.location.back()
  }

  searchReserve(){
    this.api.getReserveByID(this.searchReserveForm.controls['ID_RESERVA'].value).subscribe({
      next:(res:any)=>{
        this.reserva = res[0];
        console.log(this.reserva);
        
      },
      error:(error)=>{
        this.messageError()
        this.reserva = error['error']['text']
      }
    })
  }

  
  cancelReserve(){
    console.log(this.today);
    this.messageSuccessfull()
  }




  messageSuccessfull(){
    Swal.fire({
      icon: 'info',
      title: '¿Desea cancelar Reserva?',
      showConfirmButton: true,
      confirmButtonText: `Aceptar`, 
      showDenyButton: true,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const estado = 'CANCELADO'
        this.api.cancelReserve(this.reserva.ID_RESERVA).subscribe({
          next:(res:any)=>{
            console.log(res);
          },
          error:(error)=>{
            this.messageErrorCancelar()
            this.reserva = error['error']['text']
          }
        })
      }
    })
  }

  //Message Error 
  messageErrorCancelar(){
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
    title: 'Ups.. algo ocurrió'
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
  title: 'Numero de Reserva Erronea'
  })
}


}
