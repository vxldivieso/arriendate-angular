import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {

  rut = new FormControl('');
  id_sucursal = new FormControl('');
  id_depto = new FormControl('');
  mascotas = new FormControl(Boolean);
  cantpersonas = new FormControl(Number);
  priceDepto = new FormControl('')
  total = new FormControl('')
  monto_abonado = new FormControl('')
  monto_pendiente = new FormControl('')

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private acroute: ActivatedRoute, private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }


}
