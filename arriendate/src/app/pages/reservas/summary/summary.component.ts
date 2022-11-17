import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  id_reserva:any;
  reserva_detail:any;
  services:any

  constructor(private api:ApiService, private acroute: ActivatedRoute, private location : Location, private router:Router) { }

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('datos_reserva');
    this.getReserveById()
    this.getServicesByID()
  }

  getReserveById(){
    this.api.getReserveByID(this.id_reserva).subscribe({
      next:(res)=>{
        this.reserva_detail = res
      }
    })
  }

  getServicesByID(){
    this.api.getServicesById(this.id_reserva).subscribe({
      next:(res)=>{
        this.services = res
      }
    })
  }

  goBack(){
    this.router.navigate(['home'])
  }


}
