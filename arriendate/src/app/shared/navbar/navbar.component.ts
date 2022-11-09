import { Component, OnInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private route:Router) { }

  ngOnInit(): void {
    
  }

  logout() {
    this.route.navigate([''])
  }

}
