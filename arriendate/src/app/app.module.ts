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
import { ArriendosVigentesComponent, DialogElementsExampleDialog } from './pages/busqueda/arriendos-vigentes/arriendos-vigentes.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FechasDisponiblesComponent } from './pages/busqueda/fechas-disponibles/fechas-disponibles.component';
import { ReservaComponent } from './pages/reservas/reserva/reserva.component';
import { CheckComponent } from './pages/reservas/check/check.component';
import { CancelComponent } from './pages/reservas/cancel/cancel.component';
import { PayComponent } from './pages/reservas/pay/pay.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { InventarioComponent } from './pages/administracion/inventario/inventario.component';
import { EstadosdeptoComponent } from './pages/administracion/estadosdepto/estadosdepto.component';
import { GestionusuariosComponent } from './pages/administracion/gestionusuarios/gestionusuarios.component';
import { GestiontransporteComponent } from './pages/reporteria/gestiontransporte/gestiontransporte.component';
import { MantenciondeptosComponent } from './pages/reporteria/mantenciondeptos/mantenciondeptos.component';
import { ModuloReporteriaComponent } from './pages/reporteria/reporteria.component';
import { ReporteriaComponent } from './pages/reporteria/reporteria/reporteria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

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
    AdministracionComponent,
    InventarioComponent, 
    EstadosdeptoComponent, 
    GestionusuariosComponent, 
    GestiontransporteComponent, 
    MantenciondeptosComponent,
    ModuloReporteriaComponent,
    ReporteriaComponent,
    DialogElementsExampleDialog 
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
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
