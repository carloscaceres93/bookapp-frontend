import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../_model/categoria';
import { Tarifa } from '../_model/tarifa';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService extends GenericService<Tarifa>{

  private categoriaCambio: Subject<Tarifa[]> = new Subject<Tarifa[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/api/tarifas`
    );
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getTarifaCambio() {
    return this.categoriaCambio.asObservable();
  }

  setTarifaCambio(lista: Tarifa[]) {
    this.categoriaCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

}
