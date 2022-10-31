import { AfterViewInit, Component, Inject, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';
import { ListarDeptosComponent } from '../../busqueda/listar-deptos/listar-deptos.component';
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

  datosReserva !: String[];
  
  servicios :any;
  client : any;
  resultadoBusqueda : any;
  
  total:any;
  monto_abono:any;
  monto_servicios = 0;
  deptoSelected :any;
  valor_dia:any;
  total_personas:any;
  estacionamiento:any;
  mascotas : any;
  total_dias_reserva:any;
  fecha_desde:any;
  fecha_hasta:any;
  
  serviceChecked = false;

  today = new Date();

  id_cli : any;
  
  dato:any;
  

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
      ID_SUC : new FormControl('', Validators.required),
      ID_DEPTO : new FormControl('', Validators.required),
      FEC_DESDE: new FormControl<Date | null>(null),
      FEC_HASTA: new FormControl<Date | null>(null),
      MASCOTAS : new FormControl(''),
      TOTAL_RESERVA : new FormControl('', Validators.required),
      MONTO_ABONADO : new FormControl('', Validators.required),
      MONTO_SERVICIOS : new FormControl('', Validators.required),
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
          this.resultadoBusqueda = error['error']['text']
        }
      })
    }
    
  }


  addClient(){
    console.log(JSON.stringify(this.createClientForm.value));
    if(this.createClientForm.valid){
      this.api.newClient(JSON.stringify(this.createClientForm.value)).subscribe({
        next:(res)=>{
          console.log(res);
          
        },
        error:()=>{
          console.log('Error al crear Cliente');
          
        }
      })
    }
  }



  deptoSeleccionado(){
    this.api.getDeptoById(this.deptos_detalle.SUCURSAL_ID_SUC).subscribe({
      next:(res)=>{
        
        this.deptoSelected = res;
        this.valor_dia = this.deptoSelected[0].VALOR_DIA ;
        this.total_personas = this.deptoSelected[0].TOTAL_PERSONAS;
        this.estacionamiento = this.deptoSelected[0].ESTACIONAMIENTO;
        this.mascotas = this.deptoSelected[0].MASCOTAS;
        this.total = this.valor_dia;
        this.monto_abono = (this.total / 2)
      },
      error:()=>{
        console.log('Error al buscar depto');
        
      }
    })

  }

  reservaExterna(){
    
  }

  transporteCheck(){
    if (document.getElementById('transporte')){
      this.total = this.valor_dia + 10000
    } else{
      this.total = this.valor_dia
    }
  }
  bufetCheck(){
    if (document.getElementById('bufet') ){
      this.total = this.valor_dia + 10000
    } else{
      this.total = this.valor_dia
    }
  }
  tourCheck(){
    if (this.serviceForm.controls['tour'].value == true){
      this.total = this.valor_dia + 20000
    }
  }
  desayunoCheck(){
    if (this.serviceForm.controls['desayuno'].value == true){
      this.total = this.valor_dia + 5000
    }
  }

  transformData(){
    const format = 'YYYY-MM-DD'
    let objDesde = new Date (this.reserveForm.controls['fec_desde'].value).getDate()
    let objHasta = new Date (this.reserveForm.controls['fec_hasta'].value)

    this.fecha_desde = moment(objDesde).format(format)
    this.fecha_hasta = moment(objHasta).format(format)

    this.total_dias_reserva = this.fecha_desde
    console.log(objDesde, objHasta);
    



    

    this.total = (this.valor_dia * this.total_dias_reserva);

    console.log(this.reserveForm.value);
    
  }

  onSubmit(){
    this.datosReserva = this.reserveForm.value;
    console.log(this.datosReserva);
    
    if (this.reserveForm.valid){
      this.api.doReserve(this.datosReserva).subscribe({
        next:(res)=>{
          res
          console.log('Reserva hecha exitosamente');
          
        },
        error:()=>{
          console.log('Error al realizar reserva');
          
        }
      })
    }else{
      window.alert('Formulario invalido')
    }
  }

}
