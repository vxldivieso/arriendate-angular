import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ApiUploadService } from 'src/app/services/uploads.service';


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
  sucursales : any;

  img?:string | void;
  base64Output !: string;
  fileSelected : any

  img2?:string | void;
  base64Output2 !: string;
  fileSelected2 : any

  img3?:string | void;
  base64Output3 !: string;
  fileSelected3 : any

  img4?:string | void;
  base64Output4 !: string;
  fileSelected4: any

  image1 = "";
  image2 = "";
  image3 = "";
  image4 = "";
  imgURL = '../../../../assets/img/no-image.jpg'
  imgURL2 = '../../../../assets/img/no-image.jpg'
  imgURL3 = '../../../../assets/img/no-image.jpg'
  imgURL4 = '../../../../assets/img/no-image.jpg'

  constructor(private api:ApiService, private fb : FormBuilder, private sant: DomSanitizer,
     private dialog : MatDialog, private apiUpload : ApiUploadService){}

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('id_checkout');

    this.checkoutForm = this.fb.group({
      FOTO1 : new FormControl('', Validators.required),
      FOTO2 : new FormControl('', Validators.required),
      FOTO3 : new FormControl('', Validators.required),
      FOTO4 : new FormControl('', Validators.required),
      COMENTARIOS : new FormControl('',Validators.required)
    })
    this.searchReserve()
  }

  closeDialog(){
    this.dialog.closeAll()
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
    }
    
  }

  onFileSelected2(files: FileList):void {
    this.fileSelected2 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected2.type != 'image/jpeg' && this.fileSelected2.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img2 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected2)) as string;
      this.base64Output2;
      this.convertFileToBase642()
    }
    
  }
  onFileSelected3(files: FileList):void {
    this.fileSelected3 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected3.type != 'image/jpeg' && this.fileSelected3.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img3 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected3)) as string;
      this.base64Output3;
      this.convertFileToBase643()
    }
    
  }

  onFileSelected4(files: FileList):void {
    this.fileSelected4 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected4.type != 'image/jpeg' && this.fileSelected4.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img4 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected4)) as string;
      this.base64Output4;
      this.convertFileToBase644()
    }
    
  }

  convertFileToBase64(){
    let reader = new FileReader();
    if (this.fileSelected){
      reader.readAsDataURL(this.fileSelected as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output = reader.result as string;
        this.imgURL = this.base64Output

      }
      this.image1 = this.fileSelected
    }
  }
  convertFileToBase642(){
    let reader = new FileReader();
    if (this.fileSelected2){
      reader.readAsDataURL(this.fileSelected2 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output2 = reader.result as string;
        this.imgURL2 = this.base64Output2

      }
      this.image2 = this.fileSelected2
    }
  }
  convertFileToBase643(){
    let reader = new FileReader();
    if (this.fileSelected3){
      reader.readAsDataURL(this.fileSelected3 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output3 = reader.result as string;
        this.imgURL3 = this.base64Output3

      }
      this.image3 = this.fileSelected3
    }
  }
  convertFileToBase644(){
    let reader = new FileReader();
    if (this.fileSelected4){
      reader.readAsDataURL(this.fileSelected4 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output4 = reader.result as string;
        this.imgURL4 = this.base64Output4

      }
      this.image4 = this.fileSelected4
    }
  }

  checkout(id_depto:any, id_reserva:any){
    if (this.checkoutForm.valid){
      
      const foto1 = JSON.stringify(this.base64Output)
      const foto2 = JSON.stringify(this.base64Output2)
      const foto3 = JSON.stringify(this.base64Output3)
      const foto4 = JSON.stringify(this.base64Output4)
      let comentario = this.checkoutForm.controls['COMENTARIOS'].value
      let date = this.today
      this.apiUpload.updateStateDepto(id_depto, foto1, foto2,foto3, foto4, comentario, this.today, id_reserva).subscribe({
        next:(res:any)=>{
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
          
        },
        error:(error)=>{
          error;
          
        }
      })
      
    } else{
      this.messageErrorForm()
    }
  }

  searchReserve(){
    this.api.getReserveByID(this.id_reserva).subscribe({
      next:(res:any)=>{
        this.reserva = res[0];
        this.id_depto = this.reserva.ID_DEPTO
      },
      error:(error)=>{
        this.reserva = error['error']['text']
      }
    })
  }
  
  

 

  //Message Error Form
  messageErrorForm(){
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
    title: 'Complete los campos requeridos'
    })
  }

  messageSuccessfullCheckout(id_depto:any, id_reserva:any){
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

