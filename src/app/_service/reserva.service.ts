import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reserva } from '../_model/reserva';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService extends GenericService<Reserva>{

  private reservaCambio: Subject<Reserva[]> = new Subject<Reserva[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/reservas`
    );
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getReservaoCambio() {
    return this.reservaCambio.asObservable();
  }

  setReservaCambio(lista: Reserva[]) {
    this.reservaCambio.next(lista);
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

}
