import { AfterViewInit, Component, Inject,Input, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import { ListarDeptosComponent } from '../../busqueda/listar-deptos/listar-deptos.component';
import Swal from 'sweetalert2'
import * as moment from 'moment';



@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  

  reserveForm !: FormGroup;
  createClientForm !:FormGroup;
  searchClientForm !: FormGroup;
  serviceForm !:FormGroup;
  deptos_detalle :any;
  sucursales : any;

  datosReserva :any;
  
  servicios :any;
  client : any;
  resultadoBusqueda : any;
  
  total :any;
  monto_abono :any;
  monto_servicios =0;
  deptoSelected :any;
  valor_dia:any;
  total_personas:any;
  estacionamiento:any;
  mascotas: string[] = ['Si', 'No'];
  total_dias_reserva:any;
  fecha_desde:any;
  fecha_hasta:any;
  
  serviceValue :any;

  today = new Date();

  
  id_cli : any;
  id_depto:any;
  detalle:any;
  ultima_reserva:any;
  minDate:any;

  id_ultima_reserva:any;
  id_reserva:any
  value_transporte :any
  value_bufet:any
  value_tour:any
  value_desayuno:any

  @Input() id_reserva1:any;
  

  constructor(private acroute: ActivatedRoute, private location : Location, private fb: FormBuilder, private api:ApiService,
    @Inject(DOCUMENT) document: Document, private route:Router) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      transporte : false,
      bufet : false,
      tour : false,
      desayuno : false
    });

    this.reserveForm = this.fb.group({
      ID_CLI : new FormControl('', [Validators.minLength(8), Validators.maxLength(10)] ),
      ID_SUC : new FormControl('', Validators.required),
      ID_DEPTO : new FormControl('', Validators.required),
      FEC_DESDE: new FormControl<Date | null>(null),
      FEC_HASTA: new FormControl<Date | null>(null),
      MASCOTAS : new FormControl(''),
      TOTAL_RESERVA : new FormControl('', Validators.required),
      MONTO_ABONADO : new FormControl('', Validators.required),
      MONTO_SERVICIOS : new FormControl(''),
    })

    
    this.createClientForm = this.fb.group({
      RUT_CLI : new FormControl('',[Validators.minLength(8), Validators.maxLength(10)]),
      FIRST_NAME : new FormControl('', Validators.required),
      LAST_NAME : new FormControl('', Validators.required),
      BIRTHDAY : new FormControl<Date | null>(null),
      TELEFONO : new FormControl('', [Validators.minLength(9), Validators.maxLength(9)]),
      EMAIL : new FormControl('', Validators.required)
    })
    this.getDeptos()
    this.getSucursal()
    this.getServices()
    this.getClient()
    this.getLastReservas()
  }


  goBack(){
    this.location.back()
  }

  getDeptos(){
    this.api.getDeptos().subscribe({
      next:(res)=>{
        this.deptos_detalle = res;
        
      }
    })
  }

  getSucursal(){
    this.api.getSucursal().subscribe({
      next:(res)=>{
        this.sucursales = res;
      }
    })
  }

  getServices(){
    this.api.getServices().subscribe({
      next:(res)=>{
        
        this.servicios = res;
        
      }
    })
  }

  getClient(){
    this.api.getClient().subscribe({
      next:(res)=>{
        this.client = res;
      }
    })
  }

  getLastReservas(){
    this.api.getLastReserve().subscribe({
      next:(res)=>{
        this.id_ultima_reserva = res;
        this.id_reserva = this.id_ultima_reserva[0].ID_RESERVA
        
      }
    })
  }

  searchClient(){
    if(this.reserveForm.controls['ID_CLI'].invalid){
      window.alert('Ingrese un rut con el siguiente formato 1111111-1')
    }else{
      this.api.getClientId(this.reserveForm.controls['ID_CLI'].value).subscribe({
        next:(res:any)=>{
          this.resultadoBusqueda = res[0];
          this.id_cli = this.resultadoBusqueda.ID_CLI;
        },
        error:(error)=>{
          this.resultadoBusqueda = error.error.text
        }
      })
    }
    
  }


  addClient(){
    const format = 'YYYY-MM-DD'
    const RUT_CLI = this.createClientForm.controls['RUT_CLI'].value
    const FIRST_NAME = this.createClientForm.controls['FIRST_NAME'].value
    const LAST_NAME =this.createClientForm.controls['LAST_NAME'].value
    const BIRTHDAY = moment(this.createClientForm.controls['BIRTHDAY'].value).format(format)
    const TELEFONO = this.createClientForm.controls['TELEFONO'].value
    const EMAIL = this.createClientForm.controls['EMAIL'].value

    
    if(this.createClientForm.valid){
      this.api.newClient(RUT_CLI, FIRST_NAME, LAST_NAME, BIRTHDAY, TELEFONO, EMAIL).subscribe({
        next:(res)=>{
          console.log(res);
          this.messageExitoCliente()
          this.searchClient()
          
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  buscarClienteNuevo(){
    this.api.getClientId(this.createClientForm.controls['RUT_CLI'].value).subscribe({
      next:(res:any)=>{
        this.resultadoBusqueda = res[0];
        this.id_cli = this.resultadoBusqueda.ID_CLI;
      },
      error:(error)=>{
        this.resultadoBusqueda = error['error']['text']
      }
    })
  }



  deptoSeleccionado(){
    this.api.getDeptoById(this.deptos_detalle.SUCURSAL_ID_SUC).subscribe({
      next:(res)=>{
        
        this.deptoSelected = res;
        this.id_depto = this.deptoSelected[0].ID_DEPTO;
        this.valor_dia = this.deptoSelected[0].VALOR_DIA ;
        this.total_personas = this.deptoSelected[0].TOTAL_PERSONAS;
        //buscar fecha minima de reserva
        if(this.id_depto != null){
          this.getLastReserve()
          this.totalReserva()
          this.checkService()
        }else{
          return
        }


      },
      error:()=>{
        console.log('Error al buscar depto');
        
      }
    })

  }

  getLastReserve(){
    this.api.getLastDate(this.id_depto).subscribe({
      next:(res)=>{
        const format = 'MM-DD-YYYY'
        this.detalle = res
        if(this.detalle[0].HASTA != null){
          this.ultima_reserva = new Date (this.detalle[0].HASTA);
          this.minDate = moment(this.ultima_reserva).add('1','days').format(format)
        }else{
          console.log('este depto no tiene ninguna reserva a su nombre');
          
        }
        
      }
    })
  }

  totalReserva(){
    if(this.reserveForm.controls['FEC_DESDE'].valid && this.reserveForm.controls['FEC_HASTA'].valid){
      const desde = moment(new Date(this.reserveForm.controls['FEC_DESDE'].value))
      const hasta = moment(new Date(this.reserveForm.controls['FEC_HASTA'].value))
      const resta = hasta.diff(desde, 'days')
      this.total= (this.valor_dia * resta ) 
      this.monto_abono = (this.total / 2)
      
    }else{
      this.total = this.valor_dia 
      this.monto_abono = (this.total / 2)
    }
    
  }

  onSubmit(){
    const format = 'YYYY-MM-DD'
    const desde = moment(this.reserveForm.controls['FEC_DESDE'].value).format(format)
    const hasta = moment(this.reserveForm.controls['FEC_HASTA'].value).format(format)

    const ID_CLI = this.id_cli
    const ID_DEPTO = this.reserveForm.controls['ID_DEPTO'].value
    const ID_SUC = this.reserveForm.controls['ID_SUC'].value
    const FEC_DESDE = desde
    const FEC_HASTA = hasta
    const MONTO_ABONADO = this.reserveForm.controls['MONTO_ABONADO'].value
    const MONTO_SERVICIOS = this.reserveForm.controls['MONTO_SERVICIOS'].value
    const MONTO_TOTAL = this.reserveForm.controls['TOTAL_RESERVA'].value
    const MASCOTAS = 0;
    this.id_reserva1 = this.id_reserva + 1
    this.datosReserva = this.id_reserva1
    

    //Petici??n a api
    if (this.reserveForm.valid){
      this.api.doReserve(ID_DEPTO, ID_SUC, ID_CLI,MONTO_ABONADO, MONTO_SERVICIOS, FEC_DESDE, FEC_HASTA,  MONTO_TOTAL, MASCOTAS, this.id_reserva1).subscribe({
        next:(res)=>{
          this.messageExito()
          this.route.navigate(['home/summary']);
          this.getLastReservas()
          localStorage.setItem('datos_reserva', this.datosReserva);
          this.saveService()
        },
        error:(error)=>{
          this.messageErrorReserva()
          
        }
      })
    }else{
      window.alert('Formulario invalido')
    }
  }
  //Condicionar servicios chequeados
  checkService(){
   this.monto_servicios = 0
   this.value_transporte = 0
   this.value_bufet = 0
   this.value_tour = 0
   this.value_desayuno = 0
   if(this.serviceForm.controls['transporte'].value == true){
    this.monto_servicios +=  10000
    this.value_transporte = 1
   }
   if(this.serviceForm.controls['bufet'].value == true){
    this.monto_servicios += 10000
    this.value_bufet = 2
   }
   if(this.serviceForm.controls['tour'].value == true){
    this.monto_servicios += 20000
    this.value_tour = 3
   }
   if(this.serviceForm.controls['desayuno'].value == true){
    this.monto_servicios += 5000
    this.value_desayuno = 4
   }
   this.total += this.monto_servicios

  }
  //Guardar servicios asociados a la reserva
  saveService(){
    if(this.value_transporte !=0){
      this.api.sendService(this.id_reserva1, this.value_transporte).subscribe({
        next:(res)=>{
          res
        }
      })
    }
    if(this.value_bufet !=0){
      this.api.sendService(this.id_reserva1, this.value_bufet).subscribe({
        next:(res)=>{
          res
        }
      })
    }
    if(this.value_tour !=0){
      this.api.sendService(this.id_reserva1, this.value_tour).subscribe({
        next:(res)=>{
          res
        }
      })
    }
    if(this.value_desayuno !=0){
      this.api.sendService(this.id_reserva1, this.value_desayuno).subscribe({
        next:(res)=>{
          res
        }
      })
    }
    
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
    title: 'Reserva creada exitosamente'
    })
}
//Message Exito Creaci??n cliente
messageExitoCliente(){
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
  title: 'Cliente a??adido exitosamente'
  })
}

//Message Error Reserva
messageErrorReserva(){
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
  title: 'Algo fall?? al realizar reserva'
  })
}

//Message Error Cliente
messageErrorCliente(){
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
  title: 'Algo fall?? al a??adir cliente'
  })
}


}
