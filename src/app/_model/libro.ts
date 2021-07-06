import { Categoria } from "./categoria";
import { Tarifa } from "./tarifa";

export class Libro {
  idLibro: number;
  nombre: string;
  autor: string;
  paginas: number;
  cantidadDisponible: number;
  cantidadReservada: number;
  tarifa: Tarifa;
  categoria: Categoria;
  estado: boolean;
}
