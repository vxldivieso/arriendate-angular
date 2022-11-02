import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-gestionusuarios',
  templateUrl: './gestionusuarios.component.html',
  styleUrls: ['./gestionusuarios.component.scss']
})
export class GestionusuariosComponent implements OnInit{
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
    //this.listarUsuarios()
  }

  goBack(){
    this.location.back()
  }

/*
  listarUsuarios(){
    this.api.getClient2().subscribe({
      next:(res:any)=>{
        this.listarU = res;

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }

*/
}