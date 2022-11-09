import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  id_reserva:any;
  reserva_detail:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.id_reserva = localStorage.getItem('datos_reserva');
    console.log(this.id_reserva);
    this.getReserveById()
  }

  getReserveById(){
    this.api.getReserveByID(this.id_reserva).subscribe({
      next:(res)=>{
        console.log(res);
        this.reserva_detail = res
         
      }
    })
  }


}
