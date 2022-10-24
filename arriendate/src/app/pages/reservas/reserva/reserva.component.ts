import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  reserveForm !: FormGroup;
  createClientForm !:FormGroup;
  searchClientForm !: FormGroup;
  deptos_detalle :any;
  sucursales : any;

  datosReserva !: String[];
  mascotas : String[] = [ 'Si', 'No']
  servicios :any;
  client : any;
  resultadoBusqueda : any;
  
  servicioChecked !:number;
  total_reserva :any;

  today = new Date();

  id_cli : any;
  
  constructor(private acroute: ActivatedRoute, private location : Location, private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.reserveForm = this.fb.group({
      id_cli : new FormControl('', [Validators.minLength(8), Validators.maxLength(10)] ),
      id_suc : new FormControl('', Validators.required),
      id_depto : new FormControl('', Validators.required),
      fec_desde: new FormControl<Date | null>(null),
      fec_hasta: new FormControl<Date | null>(null),
      mascotas : new FormControl('', Validators.required),
      total_reserva : new FormControl('', Validators.required),
      monto_abonado : new FormControl('', Validators.required),
      monto_servicios : new FormControl('', Validators.required),
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

  cambioCiudad(dato:any | null){
    //Aqui va tu logica de consulta a la BD
    this.sucursales = this.deptos_detalle[dato]
  }

  searchClient(){
    if(this.reserveForm.controls['id_cli'].invalid){
      window.alert('Ingrese un rut con el siguiente formato 1111111-1')
    }else{
      this.api.getClientId(this.reserveForm.controls['id_cli'].value).subscribe({
        next:(res:any)=>{
          this.resultadoBusqueda = res[0];
          this.id_cli = this.resultadoBusqueda.ID_CLI;
          console.log(this.resultadoBusqueda.ID_CLI);
        },
        error:(error)=>{
          this.resultadoBusqueda = error['error']['text']
          console.log(this.resultadoBusqueda);
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



  transformData(){
    console.log(this.reserveForm.value);
  }

  onSubmit(){
    this.datosReserva = this.reserveForm.value;

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
    }
  }

  sumServicios(value:any){
    this.total_reserva = this.deptos_detalle

  }


}
