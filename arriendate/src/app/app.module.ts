import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { CommonModule } from '@angular/common';
import { ListarDeptosComponent, DialogElementsExampleDialog2 } from './pages/busqueda/listar-deptos/listar-deptos.component';
import { ArriendosVigentesComponent, DialogElementsExampleDialog } from './pages/busqueda/arriendos-vigentes/arriendos-vigentes.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FechasDisponiblesComponent } from './pages/busqueda/fechas-disponibles/fechas-disponibles.component';
import { ReservaComponent } from './pages/reservas/reserva/reserva.component';
import { CheckComponent, CheckoutDialogComponent } from './pages/reservas/check/check.component';
import { CancelComponent } from './pages/reservas/cancel/cancel.component';
import { PayComponent, PayDetailComponent } from './pages/reservas/pay/pay.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { AddDialogComponent, DetalleDialogComponent, ModifyDialogComponent, InventarioComponent } from './pages/administracion/inventario/inventario.component';
import { EstadosdeptoComponent, DialogElementsExampleDialog3 } from './pages/administracion/estadosdepto/estadosdepto.component';
import { GestionusuariosComponent } from './pages/administracion/gestionusuarios/gestionusuarios.component';
import { ModuloReporteriaComponent } from './pages/reporteria/reporteria.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReservaExternaComponent } from './pages/reservas/reserva-externa/reserva-externa.component';
import { MatSortModule } from '@angular/material/sort';
import { SummaryComponent } from './pages/reservas/summary/summary.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { SpinnerInterceptor } from './shared/interceptors/spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
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
    ModuloReporteriaComponent,
    DialogElementsExampleDialog,
    DialogElementsExampleDialog2,
    DialogElementsExampleDialog3,
    DetalleDialogComponent,
    AddDialogComponent,
    ModifyDialogComponent,
    ReservaExternaComponent,
    SummaryComponent,
    CheckoutDialogComponent,
    PayDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
