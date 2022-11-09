import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-estadosdepto',
  templateUrl: './estadosdepto.component.html',
  styleUrls: ['./estadosdepto.component.scss']
})
export class EstadosdeptoComponent implements OnInit {

  deptos_detalle : any;
  
  descripcion:any;
  estacionamiento:any;
  estado_depto:any;
  foto1:any;
  foto2:any;
  foto3:any;
  foto4:any;
  foto5:any;
  inventario_id:any;
  mascotas:any;
  sucursal_id_suc:any;
  total_personas:any;
  ubicacion:any;
  valor_dia:any;
  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService, private route : Router) { }

  ngOnInit(): void {
    this.getDeptos()
  }

  goBack(){
    this.location.back()
  }

  getDeptos(){
    this.api.getDeptos().subscribe({
      next:(res:any)=>{
        this.deptos_detalle = res;
      }
    })
  }

}
