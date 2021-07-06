import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { CategoriaComponent } from './categoria/categoria.component';
import { GestionarLibroComponent } from './gestionar-libro/gestionar-libro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibroComponent } from './libro/libro.component';
import { Not403Component } from './not403/not403.component';
import { ReservaComponent } from './reserva/reserva.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [GuardService]},
  {path: 'libro', component: LibroComponent, canActivate: [GuardService]},
  {path: 'categoria/:id/libro', component: LibroComponent},
  {path: 'reserva', component: ReservaComponent, canActivate: [GuardService]},

  {path: 'categoria', component: CategoriaComponent, canActivate: [GuardService]},

  {path: 'gestionar-libro', component: GestionarLibroComponent, canActivate: [GuardService]},
  {path: 'not-403', component: Not403Component},

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
