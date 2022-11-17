import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-estadosdepto',
  templateUrl: './estadosdepto.component.html',
  styleUrls: ['./estadosdepto.component.scss']
})
export class EstadosdeptoComponent implements OnInit {

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

  @Input() id_depto2:any;

  constructor(private dialog: MatDialog, private acroute: ActivatedRoute, private location : Location, private api : ApiService, private route : Router) { }

  openDialog(id_depto2:any) {
    this.dialog.open(DialogElementsExampleDialog3);

    this.id_depto2 = id_depto2;
    localStorage.setItem('deptos_detalle2', this.id_depto2);
  }

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
      }
    })
  }

}

//DIALOG LISTAR DEPTOS
@Component({
  selector: 'dialog-detalle-deptos',
  templateUrl: 'dialog-detalle-deptos.component.html',
})
export class DialogElementsExampleDialog3 implements OnInit{

  detalle_depto2 : any;
  id_depto2:any;
  
  constructor (public dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.id_depto2 = localStorage.getItem('deptos_detalle2');
    this.getDeptoDetalle()
  }
  
  closeDialog(){
    this.dialog.closeAll();
  }


  getDeptoDetalle(){
    this.api.getDeptoById(this.id_depto2).subscribe({
      next:(res:any)=>{
        this.detalle_depto2 = res;
      }
    })
  }

}
