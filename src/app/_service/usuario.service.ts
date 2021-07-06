import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../_model/usuario';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{

  private usuarioCambio: Subject<Usuario[]> = new Subject<Usuario[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/api/usuarios`
    );
  }

  listarPorEstado(estado: boolean){
    return this.http.get<any>(`${this.url}/estado?estado=${estado}`);
  }

  deshabilitarUsuario(usuario: Usuario){
    return this.http.put(`${this.url}/deshabilitar`,usuario);
  }

  getUsuarioCambio() {
    return this.usuarioCambio.asObservable();
  }

  setUsuarioCambio(lista: Usuario[]) {
    this.usuarioCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

}
