import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fechas-disponibles',
  templateUrl: './fechas-disponibles.component.html',
  styleUrls: ['./fechas-disponibles.component.scss']
})
export class FechasDisponiblesComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location, private api : ApiService) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
