import { Categoria } from "./categoria";

export class Libro {
  idLibro: number;
  nombre: string;
  autor: string;
  paginas: number;
  cantidadDisponible: number;
  cantidadReservada: number;
  tarifa: number;
  categoria: Categoria;
  estado: boolean;
}
