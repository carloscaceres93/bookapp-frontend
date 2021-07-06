import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LibroComponent } from './libro/libro.component';
import { ReservaComponent } from './reserva/reserva.component';
import { CategoriaComponent } from './categoria/categoria.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { InicioComponent } from './inicio/inicio.component';
import { ModalReservarComponent } from './libro/modal-reservar/modal-reservar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComfirmarComponent } from './generic/modal-comfirmar/modal-comfirmar.component';
import { ModalCategoriaComponent } from './categoria/modal-categoria/modal-categoria.component';
import { GestionarLibroComponent } from './gestionar-libro/gestionar-libro.component';
import { ModalLibroComponent } from './gestionar-libro/modal-libro/modal-libro.component';

@NgModule({
  declarations: [
    LayoutComponent,
    UsuarioComponent,
    LibroComponent,
    ReservaComponent,
    CategoriaComponent,
    InicioComponent,
    ModalReservarComponent,
    ModalComfirmarComponent,
    ModalCategoriaComponent,
    GestionarLibroComponent,
    ModalLibroComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
