import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { CommonModule } from '@angular/common';
import { ListarDeptosComponent } from './pages/busqueda/listar-deptos/listar-deptos.component';
import { ArriendosVigentesComponent } from './pages/busqueda/arriendos-vigentes/arriendos-vigentes.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FechasDisponiblesComponent } from './pages/busqueda/fechas-disponibles/fechas-disponibles.component';
import { ReservaComponent } from './pages/reservas/reserva/reserva.component';
import { CheckComponent } from './pages/reservas/check/check.component';
import { CancelComponent } from './pages/reservas/cancel/cancel.component';
import { PayComponent } from './pages/reservas/pay/pay.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarDeptosComponent,
    ArriendosVigentesComponent,
    BusquedaComponent,
    FechasDisponiblesComponent,
    ReservaComponent,
    CheckComponent, 
    CancelComponent, 
    PayComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
