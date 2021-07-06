import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { GestionarLibroComponent } from './gestionar-libro/gestionar-libro.component';
import { InicioComponent } from './inicio/inicio.component';
import { LibroComponent } from './libro/libro.component';
import { ReservaComponent } from './reserva/reserva.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  {path: 'categoria/:id/libro', component: LibroComponent},
  {path: 'reserva', component: ReservaComponent},
  {path: 'libro', component: LibroComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'usuario', component: UsuarioComponent},

  {path: 'gestionar-libro', component: GestionarLibroComponent},

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
