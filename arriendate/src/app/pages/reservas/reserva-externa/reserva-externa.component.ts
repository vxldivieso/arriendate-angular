import { AfterViewInit, Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import { ListarDeptosComponent } from '../../busqueda/listar-deptos/listar-deptos.component';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-reserva-externa',
  templateUrl: './reserva-externa.component.html',
  styleUrls: ['./reserva-externa.component.scss']
})
export class ReservaExternaComponent implements OnInit {
  
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
  
  serviceChecked = false;

  today = new Date();

  id_cli : any;
  id_depto:any;
  detalle:any;
  ultima_reserva:any;
  minDate:any;

  id_ultima_reserva:any;
  id_reserva:any

  dato:any;
  //variables para mostrar en html
  id_departamento:any
  id_sucursal:any



  constructor(private acroute: ActivatedRoute, private location : Location, private fb: FormBuilder, private api:ApiService,
    @Inject(DOCUMENT) document: Document) { }


  
  ngOnInit(): void {
    this.dato = localStorage.getItem('depto_seleccionado');
    console.log(this.dato);
    
    this.serviceForm = this.fb.group({
      transporte : false,
      bufet : false,
      tour : false,
      desayuno : false
    });

    this.reserveForm = this.fb.group({
      ID_CLI : new FormControl('', [Validators.minLength(8), Validators.maxLength(10)] ),
      ID_SUC : new FormControl(''),
      ID_DEPTO : new FormControl(''),
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
      EMAIL : new FormControl('', Validators.required),
      PASSWORD : new FormControl('', Validators.required)
    })
    this.getDeptos()
    this.getSucursal()
    this.getServices()
    this.getClient()
    this.deptoSeleccionado()
  }

  
  goBack(){
    this.location.back()
  }

  getDeptos(){
    this.api.getDeptos().subscribe({
      next:(res)=>{
        this.deptos_detalle = res;
        Object.entries(res).forEach(([key, value]) => {
          
        });
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
        /*
        this.servicios = res;
        console.log(this.servicios);*/
        Object.entries(res).forEach(([key, value]) => {
          this.servicios = value
        });

        
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
    const PASSWORD = this.createClientForm.controls['PASSWORD'].value

    console.log(RUT_CLI, FIRST_NAME, LAST_NAME, BIRTHDAY, TELEFONO, EMAIL, PASSWORD);
    
    if(this.createClientForm.valid){
      this.api.newClient(RUT_CLI, FIRST_NAME, LAST_NAME, BIRTHDAY, TELEFONO, EMAIL, PASSWORD).subscribe({
        next:(res)=>{
          console.log(res);
          this.messageExitoCliente()
          this.searchClient()
          
        },
        error:()=>{
          console.log('Error al crear Cliente');
          this.searchClient()
          this.messageExitoCliente()
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
    this.api.getDeptoById(this.dato).subscribe({
      next:(res)=>{
        
        this.deptoSelected = res;
        this.id_departamento = this.deptoSelected[0].NOMBRE;
        this.id_sucursal = this.deptoSelected[0].UBICACION;
        this.valor_dia = this.deptoSelected[0].VALOR_DIA ;
        this.total_personas = this.deptoSelected[0].TOTAL_PERSONAS;
        
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
    if(this.reserveForm.controls['FEC_DESDE'].value && this.reserveForm.controls['FEC_HASTA'].value){
      const desde = moment(new Date(this.reserveForm.controls['FEC_DESDE'].value))
      const hasta = moment(new Date(this.reserveForm.controls['FEC_HASTA'].value))
      const resta = hasta.diff(desde, 'days')
      this.total= this.valor_dia * resta
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
    const ID_RESERVA = this.id_reserva + 1

    //Petición a api
    if (this.reserveForm.valid){
      this.api.doReserve(ID_DEPTO, ID_SUC, ID_CLI,MONTO_ABONADO, MONTO_SERVICIOS, FEC_DESDE, FEC_HASTA,  MONTO_TOTAL, MASCOTAS, ID_RESERVA).subscribe({
        next:(res)=>{
          res;
          this.messageExito()
          
        },
        error:()=>{
          this.messageExito()
          
        }
      })
    }else{
      window.alert('Formulario invalido')
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
//Message Exito Creación cliente
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
  title: 'Cliente añadido exitosamente'
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
  title: 'Algo falló al realizar reserva'
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
  title: 'Algo falló al añadir cliente'
  })
}


}
