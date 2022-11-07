import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-gestionusuarios',
  templateUrl: './gestionusuarios.component.html',
  styleUrls: ['./gestionusuarios.component.scss']
})
export class GestionusuariosComponent implements OnInit{
  

  displayedColumns: string[] = ['ID_EMP', 'NOM_EMP','RUT_EMP','ROL_EMP','SUC_ASIGNADA','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  empleado:any;
  clientes:any;


  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
    this.listarEmpleados()
  }

  goBack(){
    this.location.back()
  }

  eliminarUsuario(id: any){
    console.log(id);
    this.api.deleteEmp(id);
    this.listarEmpleados();
  }

  listarEmpleados(){
    this.api.getEmployee().subscribe({
      next:(res:any)=>{
        this.empleado = res;
        this.dataSource = new MatTableDataSource(this.empleado);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
}