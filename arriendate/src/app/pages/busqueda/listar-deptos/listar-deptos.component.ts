import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  

  constructor(private dialog: MatDialog, private acroute: ActivatedRoute, private location : Location, private api : ApiService, private route : Router) { }

  openDialog(id_depto:any) {
    this.dialog.open(DialogElementsExampleDialog2);

    this.id_depto = id_depto;
    localStorage.setItem('deptos_detalle', this.id_depto);
  }

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

//DIALOG LISTAR DEPTOS
@Component({
  selector: 'dialog-listar-depto-dialog',
  templateUrl: 'dialog-listar-deptos.component.html',
})
export class DialogElementsExampleDialog2 implements OnInit{

  detalle_depto : any;
  id_depto:any;
  
  constructor (public dialog: MatDialog, private api : ApiService) {}

  ngOnInit(): void {
    this.id_depto = localStorage.getItem('deptos_detalle');
    this.getDeptoDetalle()
  }
  
  closeDialog(){
    this.dialog.closeAll();
  }


  getDeptoDetalle(){
    this.api.getDeptoById(this.id_depto).subscribe({
      next:(res:any)=>{
        this.detalle_depto = res;
      }
    })
  }




}