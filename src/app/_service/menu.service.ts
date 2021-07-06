import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../_model/menu';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {

  private menuCambio = new Subject<Menu[]>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/api/menus`);
  }

  listarPorUsuario(nombre: string) {
    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre);
  }

  getMenuCambio() {
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus: Menu[]) {
    this.menuCambio.next(menus);
  }

}

