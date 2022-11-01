import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }


}
