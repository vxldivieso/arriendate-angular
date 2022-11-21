import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-arriendos-vigentes',
  templateUrl: './arriendos-vigentes.component.html',
  styleUrls: ['./arriendos-vigentes.component.scss'],
  
})

export class ArriendosVigentesComponent implements OnInit {
 
  p: number = 1;

  vigentes_arriendos : any;
  subscription !: Subscription;  


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

  @Input() id_reserva:any;
  
  filterValues = {};
  filterSelectObj = [];

  displayedColumns: string[] = ['ID_RESERVA', 'FEC_RESERVA', 'ID_DEPTO','DESDE','HASTA','MONTO_TOTAL', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private acroute: ActivatedRoute, private location : Location, private api : ApiService) {
    
   }

  openDialog(id_reserva:any) {
    this.dialog.open(DialogElementsExampleDialog);

    this.id_reserva = id_reserva;
    localStorage.setItem('detalle_reserva', this.id_reserva);
  }


  ngOnInit(): void {
    this.getArriendos()

    this.subscription = this.api.refresh$.subscribe(()=>{})
    
  }

  goBack(){
    this.location.back()
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  
  
  getArriendos(){
    this.api.getArriendos().subscribe({
      next:(res:any)=>{
        this.vigentes_arriendos = res;
        this.dataSource = new MatTableDataSource(this.vigentes_arriendos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-arriendos-vigentes.component.html',
  styleUrls: ['./arriendos-vigentes.component.scss']
})
export class DialogElementsExampleDialog implements OnInit{

  detalle_arriendos : any;
  id_reserva:any;
  
  constructor (public dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('detalle_reserva');
    this.getReservaDetalle()
  }
  
  closeDialog(){
    this.dialog.closeAll();
  }

  getReservaDetalle(){
    this.api.getReserveByID(this.id_reserva).subscribe({
      next:(res:any)=>{
        this.detalle_arriendos = res;
      }
    })
  }




}