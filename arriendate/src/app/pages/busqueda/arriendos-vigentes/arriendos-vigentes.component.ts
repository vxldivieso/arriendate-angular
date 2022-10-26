import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-arriendos-vigentes',
  templateUrl: './arriendos-vigentes.component.html',
  styleUrls: ['./arriendos-vigentes.component.scss']
})
export class ArriendosVigentesComponent implements OnInit {
 
  vigentes_arriendos : any;

  id_reserva:any;
  fec_reserva:any;
  id_depto:any;
  id_suc:any;
  id_cli:any;
  estado:any;
  id_detalle_reserva:any;
  monto_abonado:any;
  monto_servicios:any;
  desde:any;
  hasta:any;
  check_in:any;
  check_out:any;
  total_arriendo:any;
  mascotas:any;

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
    this.getArriendos()
  }

  goBack(){
    this.location.back()
  }
  
  getArriendos(){
    this.api.getArriendos().subscribe({
      next:(res:any)=>{
        this.vigentes_arriendos = res;

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }
}
