import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
  
})
export class InventarioComponent implements OnInit {

  displayedColumns: string[] = ['ID_DEPTO', 'NOMBRE','DESCRIPCION','UBICACION','VALOR_DIA','TOTAL_PERSONAS','ESTACIONAMIENTO','ESTADO_DEPTO','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  deptos:any;

  @Input() id_depto:any;

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarDeptos()

  }

  goBack(){
    this.location.back()
  }

  listarDeptos(){
    this.api.getDeptos().subscribe({
      next:(res:any)=>{
        this.deptos = res;
        this.dataSource = new MatTableDataSource(this.deptos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDialog(id_depto:any) {
    this.dialog.open(DetalleDialogComponent);
    this.id_depto = id_depto;
    localStorage.setItem('depto_seleccionado', this.id_depto);
  } 

  openDialogModify(id_depto:any) {
    this.dialog.open(ModifyDialogComponent);
    this.id_depto = id_depto;
    localStorage.setItem('depto_seleccionado', this.id_depto);
  } 

  openDialogAdd(){
    this.dialog.open(AddDialogComponent);
  }

  closeDialog(){
    this.dialog.closeAll();
  }

  //Eliminar depto por ID
  eliminarDepto(){

  }

}


@Component({
  selector: 'detalle-dialog',
  templateUrl: './detalle.component.html',
})
export class DetalleDialogComponent implements OnInit{
  id_depto:any;

  detalle:any;
  constructor(private dialog: MatDialog,  private api : ApiService){}
  ngOnInit(): void {
    this.id_depto = localStorage.getItem('depto_seleccionado');
    this.getInventario()
  }

  getInventario(){
    this.api.getDeptoById(this.id_depto).subscribe({
      next:(res:any)=>{
        this.detalle = res
        console.log(this.detalle);
        
      }
    })
  }

  //Modificar depto
  modificarDepto(){

  }
  
}

@Component({
  selector: 'modify-dialog',
  templateUrl: './modify.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class ModifyDialogComponent implements OnInit{

  id_depto:any;
  detalle:any;

  estacionamiento: string[] = ['SI', 'NO'];
  mascotas: string[] = ['SI', 'NO'];

  estac:any
  masc:any

  constructor(private dialog: MatDialog,  private api : ApiService){}

  ngOnInit(): void {
    this.id_depto = localStorage.getItem('depto_seleccionado');
    this.getInventario()
  }

  getInventario(){
    this.api.getDeptoById(this.id_depto).subscribe({
      next:(res:any)=>{
        this.detalle = res
        console.log(this.detalle);
        if(this.detalle[0].ESTACIONAMIENTO == 'SI'){
          this.estac == true
        }else{
          this.estac == false
        }
        if(this.detalle[0].MASCOTAS == 1){
          this.masc == true
        }else{
          this.masc == false
        }
      }
    })
  }

  
}

@Component({
  selector: 'add-dialog',
  templateUrl: './add.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class AddDialogComponent implements OnInit{
  addForm !: FormGroup;
  deptos:any;

  estacionamiento: string[] = ['SI', 'NO'];
  mascotas: string[] = ['SI', 'NO'];

  img?:string | void;
  base64Output !: string;
  fileSelected!: Blob
  sucursales : any;

  

  constructor(@Inject(MAT_DIALOG_DATA) private dialog: MatDialog,  private api : ApiService, private fb: FormBuilder,
  private sant: DomSanitizer){}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      NOMBRE : new FormControl('',Validators.required),
      DESCRIPCION : new FormControl('',Validators.required),
      UBICACION :new FormControl('',Validators.required),
      VALOR_DIA :new FormControl('',Validators.required),
      TOTAL_PERSONAS : new FormControl('',Validators.required),
      ESTACIONAMIENTO: new FormControl('',Validators.required),
      MASCOTAS : new FormControl('',Validators.required),
      ESTADO_DEPTO : new FormControl('', Validators.required),
      SUCURSAL_ID_SUC:new FormControl('',Validators.required)
    })
    this.listarDeptos()
    this.listarSucursales()
  }

  listarDeptos(){
    this.api.getDeptos().subscribe({
      next:(res:any)=>{
        this.deptos = res[0].ID_DEPTO;
      }
    })
  }

  listarSucursales(){
    this.api.getSucursal().subscribe({
      next:(res:any)=>{
        this.sucursales = res
        console.log(this.sucursales)
      }
    })
  }

  onSubmit(){
    const nombre = this.addForm.controls['NOMBRE'].value;
    const descripcion = this.addForm.controls['DESCRIPCION'].value
    const ubicacion= this.addForm.controls['UBICACION'].value
    const valor_dia= this.addForm.controls['VALOR_DIA'].value
    const total_personas= this.addForm.controls['TOTAL_PERSONAS'].value
    const estacionamiento= this.addForm.controls['ESTACIONAMIENTO'].value
    const mascotas= this.addForm.controls['MASCOTAS'].value
    const inventario_id= this.deptos + 1
    const sucursal_id_suc= this.addForm.controls['SUCURSAL_ID_SUC'].value;
    if(this.addForm.valid){
      this.api.addDepto(nombre, descripcion, ubicacion, valor_dia, total_personas, estacionamiento, mascotas, inventario_id, sucursal_id_suc).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.messageExito()
        }
      })
    }else{
      this.messageError()
    }
  }

  onFileSelected(files: FileList):void {
    this.fileSelected = files[0]
    let tmp_pr = 0;
    if(this.fileSelected.type != 'image/jpeg' && this.fileSelected.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      this.base64Output;
      this.convertFileToBase64()
    }
    
  }

  convertFileToBase64(){
    let reader = new FileReader();
    if (this.fileSelected){
      reader.readAsDataURL(this.fileSelected as Blob)
      reader.onloadend = () => {this.base64Output = reader.result as string;}
    }
    
  }

  //Message Exito
messageExito(){
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
  icon: 'success',
  title: 'Departamento añadido exitosamente'
  })
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
  title: 'Complete los campos correctamente'
  })
}

  

  
}





