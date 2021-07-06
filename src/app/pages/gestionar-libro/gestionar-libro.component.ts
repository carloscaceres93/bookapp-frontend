import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Libro } from 'src/app/_model/libro';
import { LibroService } from 'src/app/_service/libro.service';
import { ModalComfirmarComponent } from '../generic/modal-comfirmar/modal-comfirmar.component';
import { ModalLibroComponent } from './modal-libro/modal-libro.component';

@Component({
  selector: 'app-gestionar-libro',
  templateUrl: './gestionar-libro.component.html',
  styleUrls: ['./gestionar-libro.component.css']
})
export class GestionarLibroComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Libro>;
  displayedColumns: string[] =['nombre','autor','cantidadDisponible','cantidadReservada', 'tarifa', 'categoria', 'acciones'];
  cantidad: number = 0;

  constructor(
    private libroService: LibroService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.listarLibro();
    this.getLibroCambio();
    this.getMensajeCambio();
  }

  private listarLibro(categoria?: any){
    this.libroService.listarPageable(0,10).subscribe(data =>{
      categoria = data;
      this.cantidad = categoria.totalElements;
      this.dataSource = new MatTableDataSource(categoria.content);
      this.dataSource.sort = this.sort;
    })
  }

  private getLibroCambio() {
    this.libroService.getLibroCambio().subscribe((data) => {
      this.listarLibro(data);
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

  mostrarMas(e: any){
    this.libroService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(id: number){
    let dialogRef = this.dialog.open(ModalComfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.libroService.eliminar(id).pipe(switchMap(()=>{
          return this.libroService.listarPageable(0,10);
        }))
        .subscribe(data =>{
          this.libroService.setLibroCambio(data);
          this.libroService.setMensajeCambio("SE ELIMINO");
        })
      }
    })
  }

  openDialog(id?: number) {
    this.dialog.open(ModalLibroComponent, {
      disableClose: true,
      height: '400px',
      width: '500px',
      data: {
        id: id
      },
    })
  }
}
