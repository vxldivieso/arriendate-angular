import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ApiReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-gestionusuarios',
  templateUrl: './gestionusuarios.component.html',
  styleUrls: ['./gestionusuarios.component.scss']
})
export class GestionusuariosComponent implements OnInit{
  

  displayedColumns: string[] = ['ID_EMP', 'NOM_EMP','RUT_EMP','SUC_ASIGNADA','ROL_EMP', 'acciones'];
  dataSource!: MatTableDataSource<any>;


  clientColumns: string[] = ['ID_CLI','RUT_CLI','FIRST_NAME','EMAIL','ROL_USUARIO', 'acciones'];
  dataSourceClient!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator2!:MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  name = 'ExcelSheet.xlsx';
  empleado:any;
  clientes:any;


  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
    this.listarEmpleados()
    this.listarUsuarios()
  }

  goBack(){
    this.location.back()
  }

  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  eliminarUsuario(element : any){
    console.log(element);
    this.api.deleteEmp(element.id).subscribe(res=>{
      alert("Empleado eliminado con éxito")
    });
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

  listarUsuarios(){
    this.api.getClient().subscribe({
      next:(res:any)=>{
        this.clientes = res;
        this.dataSourceClient = new MatTableDataSource(this.clientes);
        this.dataSourceClient.paginator = this.paginator2;
        this.dataSourceClient.sort = this.sort2;
      }
    })
  }
}