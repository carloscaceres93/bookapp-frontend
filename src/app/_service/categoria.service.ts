import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../_model/categoria';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria>{

  private categoriaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/api/categorias`
    );
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getCategoriaCambio() {
    return this.categoriaCambio.asObservable();
  }

  setCategoriaCambio(lista: Categoria[]) {
    this.categoriaCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

}
