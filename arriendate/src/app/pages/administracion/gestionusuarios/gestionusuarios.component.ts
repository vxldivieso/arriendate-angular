import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-gestionusuarios',
  templateUrl: './gestionusuarios.component.html',
  styleUrls: ['./gestionusuarios.component.scss']
})
export class GestionusuariosComponent implements OnInit {

  listarU : any;
  //dataSource = new MatTableDataSource(this.listarUsuarios);

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
    this.listarUsuarios()
  }

  goBack(){
    this.location.back()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarUsuarios(){
    this.api.getClient().subscribe({
      next:(res:any)=>{
        this.listarU = res;

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }
}
