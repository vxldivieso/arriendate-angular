import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reporteria',
  templateUrl: './reporteria.component.html',
  styleUrls: ['./reporteria.component.scss']
  
})
export class ModuloReporteriaComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }
  goBack(){
    this.location.back()
  }

}
