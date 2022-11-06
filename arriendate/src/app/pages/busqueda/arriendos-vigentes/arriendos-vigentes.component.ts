import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-arriendos-vigentes',
  templateUrl: './arriendos-vigentes.component.html',
  styleUrls: ['./arriendos-vigentes.component.scss']
})

export class ArriendosVigentesComponent implements OnInit {
 
  p: number = 1;

  vigentes_arriendos : any;



  id_reserva:any;
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



  constructor(private dialog: MatDialog, private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }


  ngOnInit(): void {
    this.getArriendos()
  }

  goBack(){
    this.location.back()
  }
  
  getArriendos(){
    this.api.getArriendos().subscribe({
      next:(res:any)=>{
        this.vigentes_arriendos = res;

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-arriendos-vigentes.component.html',
})
export class DialogElementsExampleDialog {

  detalle_arriendos : any;
  
  constructor (public dialog: MatDialog, private api : ApiService) {}
  
  closeDialog(){
    this.dialog.closeAll();
  }

  getArriendos(){
    this.api.getArriendos().subscribe({
      next:(res:any)=>{
        this.detalle_arriendos = res;

        Object.entries(res).forEach(([key, value]) => {
          //Aquí recibimos cada variable del esquema de la base de datos, en el html se interpolan de manera directa ej: {{id_depto}}
          
        });
      }
    })
  }


}
