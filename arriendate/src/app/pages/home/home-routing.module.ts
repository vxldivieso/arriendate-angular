import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArriendosVigentesComponent } from '../busqueda/arriendos-vigentes/arriendos-vigentes.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { FechasDisponiblesComponent } from '../busqueda/fechas-disponibles/fechas-disponibles.component';
import { ListarDeptosComponent } from '../busqueda/listar-deptos/listar-deptos.component';
import { CancelComponent } from '../reservas/cancel/cancel.component';
import { CheckComponent } from '../reservas/check/check.component';
import { ModuleComponent } from '../reservas/module.component';
import { PayComponent } from '../reservas/pay/pay.component';
import { ReservaComponent } from '../reservas/reserva/reserva.component';
import { HomeComponent } from './home.component';
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'modulo_reserva', component: ModuleComponent},
    {path: 'realizar_reserva', component: ReservaComponent},
    {path: 'check', component: CheckComponent},
    {path: 'cancel', component: CancelComponent},
    {path: 'pay', component:PayComponent},
    {path: 'busqueda', component: BusquedaComponent},
    {path: 'arriendos_vigentes', component: ArriendosVigentesComponent},
    {path: 'fechas_disponibles', component: FechasDisponiblesComponent},
    {path: 'listar_deptos', component: ListarDeptosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class HomeRoutingModule { }
