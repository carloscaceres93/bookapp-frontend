import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Libro } from '../_model/libro';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class LibroService extends GenericService<Libro>{

  private libroCambio: Subject<Libro[]> = new Subject<Libro[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/api/libros`
    );
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  listarLibrosDisponibles(p: number, s: number) {
    return this.http.get<any>(`${this.url}/libros-disponibles?page=${p}&size=${s}`);
  }

  listarPorCategoria(id: number){
    return this.http.get<any>(`${this.url}/idCategoria/${id}`);
  }

  getLibroCambio() {
    return this.libroCambio.asObservable();
  }

  setLibroCambio(lista: Libro[]) {
    this.libroCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

}
