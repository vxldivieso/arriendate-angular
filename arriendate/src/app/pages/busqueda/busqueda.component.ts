import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  
})
export class BusquedaComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

}
