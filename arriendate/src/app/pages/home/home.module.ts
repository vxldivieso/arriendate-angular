import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { ModuleComponent } from '../reservas/module.component';
import { ReservaComponent } from '../reservas/reserva/reserva.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { CheckComponent } from '../reservas/check/check.component';
import { CancelComponent } from '../reservas/cancel/cancel.component';
import { PayComponent } from '../reservas/pay/pay.component';


@NgModule({
  declarations: [HomeComponent, ModuleComponent, NavbarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
