import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Libro } from 'src/app/_model/libro';
import { LibroService } from 'src/app/_service/libro.service';
import { ModalReservarComponent } from './modal-reservar/modal-reservar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  idCategoria: number;
  libros: Libro[];

  constructor(
    private libroService: LibroService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params)=>{
      this.idCategoria = data['id'];

      if(this.idCategoria != undefined){
        this.listarPorCategoria();
      }else{
        this.listarTodos();
      }

    });
  }

  private listarTodos(){
    this.libroService.listar().subscribe(data =>{
      this.libros = data;
    });
  }

  private listarPorCategoria(){
    this.libroService.listarPorCategoria(this.idCategoria).subscribe(data=>{
      this.libros = data;

    });
  }

  openDialog(id?: number) {
    this.dialog.open(ModalReservarComponent, {
      disableClose: true,
      height: '400px',
      width: '580px',
      data: {
        id: id
      },
    }),
    console.log(id);

  }

  private getLibroCambio() {
    this.libroService.getLibroCambio().subscribe((data) => {
      this.libros = data;
    });
  }

  private getMensajeCambio() {
    this.libroService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }

  validar(){
    let tamaño = this.libros.length;
    let validar = true;
    if(tamaño < 0){
      validar =false;
    }else{
      validar =true;
    }

    return validar;
  }
}
