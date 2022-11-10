import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from '../administracion/administracion.component';
import { EstadosdeptoComponent } from '../administracion/estadosdepto/estadosdepto.component';
import { GestionusuariosComponent } from '../administracion/gestionusuarios/gestionusuarios.component';
import { InventarioComponent } from '../administracion/inventario/inventario.component';
import { ArriendosVigentesComponent } from '../busqueda/arriendos-vigentes/arriendos-vigentes.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
import { FechasDisponiblesComponent } from '../busqueda/fechas-disponibles/fechas-disponibles.component';
import { ListarDeptosComponent } from '../busqueda/listar-deptos/listar-deptos.component';
import { GestiontransporteComponent } from '../reporteria/gestiontransporte/gestiontransporte.component';
import { MantenciondeptosComponent } from '../reporteria/mantenciondeptos/mantenciondeptos.component';
import { ModuloReporteriaComponent} from '../reporteria/reporteria.component';
import { ReporteriaComponent } from '../reporteria/reporteria/reporteria.component';
import { CancelComponent } from '../reservas/cancel/cancel.component';
import { CheckComponent } from '../reservas/check/check.component';
import { ModuleComponent } from '../reservas/module.component';
import { PayComponent } from '../reservas/pay/pay.component';
import { ReservaExternaComponent } from '../reservas/reserva-externa/reserva-externa.component';
import { ReservaComponent } from '../reservas/reserva/reserva.component';
import { SummaryComponent } from '../../reservas/summary/summary.component';
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
    {path: 'listar_deptos', component: ListarDeptosComponent},
    {path: 'administracion', component: AdministracionComponent},
    {path: 'actualizar_estado', component: EstadosdeptoComponent},
    {path: 'gestion_usuarios', component: GestionusuariosComponent},
    {path: 'inventario', component: InventarioComponent},
    {path: 'modulo_reporteria', component: ModuloReporteriaComponent},
    {path: 'gestion_transporte', component: GestiontransporteComponent},
    {path: 'mantencion', component: MantenciondeptosComponent},
    {path: 'reporteria', component: ReporteriaComponent},
    {path: 'reserva_externa', component: ReservaExternaComponent},
    {path: 'summary', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class HomeRoutingModule { }
