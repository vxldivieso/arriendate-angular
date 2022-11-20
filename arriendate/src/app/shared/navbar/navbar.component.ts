import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    { provide: Window, useValue: window }
  ]
})
export class NavbarComponent implements OnInit {
  constructor(private route:Router,private location : Location) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.route.navigate([''])
  }

  refresh(){
    window.location.reload();
  }

}
