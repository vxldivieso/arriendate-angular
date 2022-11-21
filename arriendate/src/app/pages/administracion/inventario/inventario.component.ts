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
import { ApiUploadService } from 'src/app/services/uploads.service';
import { Subscription } from 'rxjs';


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
subscription !: Subscription;  
  detalle:any;
  constructor(private dialog: MatDialog,  private api : ApiService){}
  ngOnInit(): void {
    this.id_depto = localStorage.getItem('depto_seleccionado');
    this.getInventario()
    
    this.subscription = this.api.refresh$.subscribe(()=>{})
    
  }

  getInventario(){
    this.api.getDeptoById(this.id_depto).subscribe({
      next:(res:any)=>{
        this.detalle = res
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
  tv_cable : string[] = ['SI', 'NO'];
  internet: string[] = ['SI', 'NO'];
  cocina: string[] = ['SI', 'NO'];
  refrigerador: string[] = ['SI', 'NO'];

  sucursales : any;

  img?:string | void;
  base64Output !: string;
  fileSelected : any

  img2?:string | void;
  base64Output2 !: string;
  fileSelected2 : any

  img3?:string | void;
  base64Output3 !: string;
  fileSelected3 : any

  img4?:string | void;
  base64Output4 !: string;
  fileSelected4: any

  image1 = "";
  image2 = "";
  image3 = "";
  image4 = "";
  imgURL = '../../../../assets/img/no-image.jpg'

  

  constructor(private dialog: MatDialog,  private api : ApiService, private fb: FormBuilder,
  private sant: DomSanitizer, private apiDepto: ApiUploadService){}

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
      SUCURSAL_ID_SUC:new FormControl('',Validators.required),
      CAMA_1PL : new FormControl(Number, Validators.required),
      CAMA_2PL : new FormControl(Number, Validators.required),
      COCINA : new FormControl('', Validators.required),
      REFRIGERADOR : new FormControl('', Validators.required),
      INTERNET : new FormControl('', Validators.required),
      TV_CABLE : new FormControl('', Validators.required),
      CANT_TV_DEPTO : new FormControl('', Validators.required),
      COMENTARIOS : new FormControl(''),
      FOTO1 : new FormControl('', Validators.required),
      FOTO2 : new FormControl('', Validators.required),
      FOTO3 : new FormControl('', Validators.required),
      FOTO4 : new FormControl('', Validators.required)
    })
    this.listarLastDeptos()
    this.listarSucursales()
  }

  listarLastDeptos(){
    this.apiDepto.lastDepto().subscribe({
      next:(res:any)=>{
        this.deptos = res[0].ID_DEPTO;
      }
    })
  }
  listarSucursales(){
    this.api.getSucursal().subscribe({
      next:(res:any)=>{
        this.sucursales = res
      }
    })
  }

  closeDialog(){
    this.dialog.closeAll()
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

  onFileSelected2(files: FileList):void {
    this.fileSelected2 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected2.type != 'image/jpeg' && this.fileSelected2.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img2 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected2)) as string;
      this.base64Output2;
      this.convertFileToBase642()
    }
    
  }
  onFileSelected3(files: FileList):void {
    this.fileSelected3 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected3.type != 'image/jpeg' && this.fileSelected3.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img3 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected3)) as string;
      this.base64Output3;
      this.convertFileToBase643()
    }
    
  }

  onFileSelected4(files: FileList):void {
    this.fileSelected4 = files[0]
    let tmp_pr = 0;
    if(this.fileSelected4.type != 'image/jpeg' && this.fileSelected4.type != 'image/png'){
      tmp_pr = 1;
      alert("El archivo no es una imagen.");
    }
    if(tmp_pr == 0){
      this.img4 = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected4)) as string;
      this.base64Output4;
      this.convertFileToBase644()
    }
    
  }

  convertFileToBase64(){
    let reader = new FileReader();
    if (this.fileSelected){
      reader.readAsDataURL(this.fileSelected as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output = reader.result as string;
        this.imgURL = this.base64Output

      }
      this.image1 = this.fileSelected
    }
  }
  convertFileToBase642(){
    let reader = new FileReader();
    if (this.fileSelected2){
      reader.readAsDataURL(this.fileSelected2 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output2 = reader.result as string;
        this.imgURL = this.base64Output2

      }
      this.image2 = this.fileSelected2
    }
  }
  convertFileToBase643(){
    let reader = new FileReader();
    if (this.fileSelected3){
      reader.readAsDataURL(this.fileSelected3 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output3 = reader.result as string;
        this.imgURL = this.base64Output3

      }
      this.image3 = this.fileSelected3
    }
  }
  convertFileToBase644(){
    let reader = new FileReader();
    if (this.fileSelected4){
      reader.readAsDataURL(this.fileSelected4 as Blob)
      reader.onloadend = (event:any) => 
      {
        this.base64Output4 = reader.result as string;
        this.imgURL = this.base64Output4

      }
      this.image4 = this.fileSelected4
    }
  }

  onSubmit(){
    const nombre = this.addForm.controls['NOMBRE'].value;
    const descripcion = this.addForm.controls['DESCRIPCION'].value
    const ubicacion= this.addForm.controls['UBICACION'].value
    const valor_dia= this.addForm.controls['VALOR_DIA'].value
    const total_personas= this.addForm.controls['TOTAL_PERSONAS'].value
    const estacionamiento= this.addForm.controls['ESTACIONAMIENTO'].value
    const mascotas= this.addForm.controls['MASCOTAS'].value == 'SI' ? 1 : 0;
    const sucursal_id_suc= this.addForm.controls['SUCURSAL_ID_SUC'].value;
    const estado_depto = this.addForm.controls['ESTADO_DEPTO'].value;
    const cama_2pl = this.addForm.controls['CAMA_2PL'].value;
    const cama_1pl = this.addForm.controls['CAMA_1PL'].value;
    const cocina = this.addForm.controls['COCINA'].value == 'SI' ? 1 : 0;
    const refrigerador = this.addForm.controls['REFRIGERADOR'].value == 'SI' ? 1 : 0;
    const internet = this.addForm.controls['INTERNET'].value == 'SI' ? 1 : 0;
    const tv_cable = this.addForm.controls['TV_CABLE'].value == 'SI' ? 1 : 0;
    const cant_tv_depto = this.addForm.controls['CANT_TV_DEPTO'].value;
    const comentarios = this.addForm.controls['COMENTARIOS'].value;
    const foto1 = JSON.stringify(this.base64Output)
    const foto2= JSON.stringify(this.base64Output2)
    const foto3 = JSON.stringify(this.base64Output3)
    const foto4 = JSON.stringify(this.base64Output4)
    const departamento_id_depto= this.deptos + 1
    const departamento_sucursal_id_suc = this.addForm.controls['SUCURSAL_ID_SUC'].value;
    
    
    if(this.addForm.valid){
      this.apiDepto.createDepto(nombre, descripcion, ubicacion, valor_dia, total_personas, estacionamiento, mascotas,
       sucursal_id_suc, estado_depto,cama_2pl, cama_1pl, cocina, refrigerador, internet, tv_cable, cant_tv_depto,
       comentarios, foto1, foto2, foto3, foto4, departamento_id_depto, departamento_sucursal_id_suc).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.messageExito()
          this.closeDialog()
        }
      })
    }else{
      this.messageError()
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
  title: 'Complete los campos requeridos'
  })
}

  

  
}





