import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-arriendos-vigentes',
  templateUrl: './arriendos-vigentes.component.html',
  styleUrls: ['./arriendos-vigentes.component.scss']
})
export class ArriendosVigentesComponent implements OnInit {

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }
}
