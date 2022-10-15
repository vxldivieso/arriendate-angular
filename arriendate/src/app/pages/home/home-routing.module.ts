import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from '../reservas/module.component';
import { ReservaComponent } from '../reservas/reserva/reserva.component';
import { HomeComponent } from './home.component';
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'modulo_reserva', component: ModuleComponent},
    {path: 'realizar_reserva', component: ReservaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class HomeRoutingModule { }
