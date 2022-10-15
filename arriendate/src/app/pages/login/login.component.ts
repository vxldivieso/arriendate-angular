import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup;

  rut:any;
  password:any;

  rutapi:any;
  passapi:any;

  login = false;

  constructor(private formBuilder: FormBuilder, private api:ApiService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      rut: ['', [Validators.minLength(7), Validators.maxLength(8)]],
      password : ['',Validators.required]
    })

    this.getEmployee()
  }

  getEmployee(){
    this.api.getEmployee().subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
  }

  onSubmit(){
    this.rut = this.loginForm.controls['rut'].value
    this.password = this.loginForm.controls['password'].value
    if(this.loginForm.valid){
      this.api.login(this.rut, this.password).subscribe({
        next:(res)=>{
          console.log('Ingreso correcto');
          this.login = true;
          this.route.navigate(['home'])
        },
        error: ()=>{
          console.log('Error en las credenciales');
        }
      })
    }
  }

}
