import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-listar-deptos',
  templateUrl: './listar-deptos.component.html',
  styleUrls: ['./listar-deptos.component.scss']
})
export class ListarDeptosComponent implements OnInit {
  deptos_detalle : any;

  id_depto:any;
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
  
  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

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

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }

}
