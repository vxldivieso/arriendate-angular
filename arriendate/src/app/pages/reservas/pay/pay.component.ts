import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  searchReserveForm!: FormGroup;
  reserva : any;
  id_reserva:any;

  displayedColumns: string[] = ['ID_RESERVA','RUT_CLI','NOMBRE_DEPTO','UBICACION','DESDE','HASTA','TOTAL_ARRIENDO','MONTO_ABONADO','MONTO_PENDIENTE','ESTADO','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api:ApiService, private acroute: ActivatedRoute, private location : Location, 
    private fb : FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchReserveForm = this.fb.group({
      RUT_CLI : new FormControl('',  Validators.required )
    })
  }

  openDialog(id_reserva:any) {
    this.dialog.open(PayDetailComponent);

    this.id_reserva = id_reserva;
    localStorage.setItem('pay_detalle', this.id_reserva);
  }

  goBack(){
    this.location.back()
  }

  searchReserve(){
    if(this.searchReserveForm.valid){
      this.api.getReservebyRut(this.searchReserveForm.controls['RUT_CLI'].value).subscribe({
        next:(res:any)=>{
          this.reserva = res;
          this.dataSource = new MatTableDataSource(this.reserva);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(error)=>{
          console.log(error);
          
          this.messageError()
        }
      })
    }
  }

  //Message Error
  messageError(){
    const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })
    Toast.fire({
    icon: 'error',
    title: 'Rut erroneo'
    })
  }

}

@Component({
  selector: 'app-detail',
  templateUrl: './detalle.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayDetailComponent implements OnInit{

  detalle_arriendos : any;
  id_reserva:any;
  
  constructor (public dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('pay_detalle');
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