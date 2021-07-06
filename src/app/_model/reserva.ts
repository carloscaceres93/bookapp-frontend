import { Libro } from "./libro";
import { Usuario } from "./usuario";

export class Reserva {
  idReserva: number;
  usuario: Usuario;
  libro: Libro;
  cantidad: number;
  fechareservacion: string;
  fechaDevolucion: string;
  estado: boolean;
}
