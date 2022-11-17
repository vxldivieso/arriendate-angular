import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ApiReportService } from 'src/app/services/report.service';


export interface PeriodicElement {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, categoria: 'Comercial', nombre: 'Pagos', descripcion: 'Pagos mes actual' },
  {id: 2, categoria: 'Indicadores', nombre: 'Reservas exitosas', descripcion: 'Número de reservas realizadas exitosamente' },
  {id: 3, categoria: 'Gestión', nombre: 'Mantención Deptos', descripcion: 'Departamentos que necesitan mantención' },
  {id: 4, categoria: 'Gestión', nombre: 'Transporte', descripcion: 'Gestión de Transporte'}
];
@Component({
  selector: 'app-reporteria',
  templateUrl: './reporteria.component.html',
  styleUrls: ['./reporteria.component.scss']
  
})
export class ModuloReporteriaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'categoria','nombre','descripcion','acciones'];
  dataSource = ELEMENT_DATA;

  displayedColumns1: string[] = ['id_pago', 'categoria','fec_pago','id_reserva','id_depto', 'id_cli','fec_reserva','monto','nombre','estado'];
  dataSource1!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  pagos:any;
  name = 'Pagos mes actual.xlsx';
  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService, 
    private apiR: ApiReportService) { }

  ngOnInit(): void {
    this.getPagos()
  }

  goBack(){
    this.location.back()
  }

  downloadPagos(id:any): void {
    let element = document.getElementById('pagos-table');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Sheet1');

    XLSX.writeFile(book, this.name);
  }

  getPagos(){
    this.apiR.getPagos().subscribe({
      next:(res:any)=>{
        this.pagos = res;
        this.dataSource1 = new MatTableDataSource(this.pagos);
      }
    })
  }

}
