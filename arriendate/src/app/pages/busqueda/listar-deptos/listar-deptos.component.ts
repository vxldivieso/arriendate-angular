import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-deptos',
  templateUrl: './listar-deptos.component.html',
  styleUrls: ['./listar-deptos.component.scss'],
  
})

export class ListarDeptosComponent implements OnInit {
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

  @Input() id_depto:any;

  dataSource!: MatTableDataSource<any>;
  

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService, private route : Router) { }

  ngOnInit(): void {
    this.getDeptos()
    

  }

  goBack(){
    this.location.back()
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  

  getDeptos(){
    this.api.getDeptos().subscribe({
      next:(res:any)=>{
        this.deptos_detalle = res;
        this.dataSource = new MatTableDataSource(this.deptos_detalle);
        
      }
    })
  }

  reservarDepto(id_depto:any){
    this.id_depto = id_depto;
    localStorage.setItem('depto_seleccionado', this.id_depto);
    this.route.navigate(['home/reserva_externa']);
  }
}