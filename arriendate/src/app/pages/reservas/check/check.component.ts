import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';


@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  searchReserveForm!: FormGroup;
  reserva : any;
  format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  today = moment().format() ;

  constructor(private acroute: ActivatedRoute, private location : Location, private fb : FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.searchReserveForm = this.fb.group({
      ID_RESERVA : new FormControl('',  Validators.required )
    })
  }

  goBack(){
    this.location.back()
  }

  searchReserve(){
    this.api.getReserveByID(this.searchReserveForm.controls['ID_RESERVA'].value).subscribe({
      next:(res:any)=>{
        this.reserva = res[0];
      },
      error:(error)=>{
        this.messageError()
      }
    })
  }



  checkIn(){
    this.messageSuccessfullCheckin()
  }

  checkout(){
    this.messageSuccessfullCheckout()
  }

  messageSuccessfullCheckin(){
      Swal.fire({
        icon: 'info',
        title: '¿Desea realizar Check in?',
        showConfirmButton: true,
        confirmButtonText: `Aceptar`, 
        showDenyButton: true,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.api.checkin(this.reserva.ID_RESERVA, this.today).subscribe({
            next:(res:any)=>{
              console.log(res);
              this.messageExito();
            },
            error:(error)=>{
              this.messageErrorCheckin()
            }
          })
        }
      })
    }

    //Message Exito 
    messageExito(){
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
      icon: 'success',
      title: 'Operación exitosa'
      })
  }



    //Message Error Check in 
    messageErrorCheckin(){
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
      title: 'Ups.. Check in Erroneo'
      })
  }

  messageSuccessfullCheckout(){
    Swal.fire({
      icon: 'info',
      title: '¿Desea realizar Check out?',
      showConfirmButton: true,
      confirmButtonText: `Aceptar`, 
      showDenyButton: true,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.api.checkout(this.reserva.ID_RESERVA, this.today).subscribe({
          next:(res:any)=>{
            console.log(res);
            this.messageExito();
          },
          error:(error)=>{
            this.messageErrorCheckout()
            this.reserva = error['error']['text']
          }
        })
      }
    })
  }
  //Message Error Check in 
  messageErrorCheckout(){
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
    title: 'Ups.. Check out Erroneo'
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
