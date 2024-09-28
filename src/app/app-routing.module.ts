import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTareasComponent } from './listar-tareas/listar-tareas.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  { path: 'inicio', component: LandingPageComponent },
  { path: 'lista-tareas', component: ListarTareasComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }