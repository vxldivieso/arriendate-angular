import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

}
