import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';


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
  id_reserva: any;
  constructor(private dialog: MatDialog,private acroute: ActivatedRoute, private location : Location, private fb : FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.searchReserveForm = this.fb.group({
      ID_RESERVA : new FormControl('',  Validators.required )
    })
  }

  goBack(){
    this.location.back()
  }

  openDialog(id_reserva:any) {
    this.dialog.open(CheckoutDialogComponent);
    this.id_reserva = id_reserva;
    localStorage.setItem('id_checkout', this.id_reserva);
  }

  searchReserve(){
    this.api.getReserveByID(this.searchReserveForm.controls['ID_RESERVA'].value).subscribe({
      next:(res:any)=>{
        this.reserva = res[0];
      },
      error:(error)=>{
        this.messageError()
        this.reserva = error['error']['text']
      }
    })
  }



  checkIn(){
    this.messageSuccessfullCheckin()
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
              this.messageExito();
            },
            error:(error)=>{
              console.log(error);
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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./check.component.scss']
  
})
export class CheckoutDialogComponent implements OnInit {
  id_reserva:any;
  reserva:any
  id_depto:any
  format = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
  today = moment().format() ;

  checkoutForm !: FormGroup;

  img?:string | void;
  base64Output !: string;
  fileSelected!: Blob
  sucursales : any;

  constructor(private api:ApiService, private fb : FormBuilder, private sant: DomSanitizer, private dialog : MatDialog){}

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('id_checkout');

    this.checkoutForm = this.fb.group({
      FOTO1 : new FormControl(''),
      FOTO2 : new FormControl(''),
      FOTO3 : new FormControl(''),
      FOTO4 : new FormControl(''),
      FOTO5 : new FormControl(''),
      COMENTARIOS : new FormControl('',Validators.required)
    })
    this.searchReserve()
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  checkout(){
    
    this.messageSuccessfullCheckout()
  }

  searchReserve(){
    this.api.getReserveByID(this.id_reserva).subscribe({
      next:(res:any)=>{
        this.reserva = res[0];
        this.id_depto = this.reserva.ID_DEPTO
        console.log(this.reserva);
        
      },
      error:(error)=>{
        this.reserva = error['error']['text']
      }
    })
  }
  onFileSelected(files: FileList):void {
    this.fileSelected = files[0]
    let tmp_pr = 0;
    if(this.fileSelected.type != 'image/jpeg' && this.fileSelected.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      this.base64Output;
      this.convertFileToBase64()
      ;
      
    }
    
  }

  convertFileToBase64(){
    let reader = new FileReader();
    if (this.fileSelected){
      reader.readAsDataURL(this.fileSelected as Blob)
      reader.onloadend = () => {this.base64Output = reader.result as string;}
      console.log(this.fileSelected);
      
    }
    
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
        this.api.checkout(this.id_reserva, this.today).subscribe({
          next:(res:any)=>{
            this.closeDialog()
            this.messageExito();
          },
          error:(error)=>{
            console.log(error);
              this.messageErrorCheckout()
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
}

