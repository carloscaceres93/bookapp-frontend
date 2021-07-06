import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { ModalComfirmarComponent } from '../generic/modal-comfirmar/modal-comfirmar.component';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Categoria>;
  displayedColumns: string[] =['nombre','descripcion','acciones'];
  cantidad: number = 0;

  constructor(
    private categoriaService: CategoriaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getReservaCambio();
    this.getMensajeCambio();
    this.listarCategoria();
  }

  private listarCategoria(categoria?: any){
    this.categoriaService.listarPageable(0,10).subscribe(data =>{
      categoria = data;
      this.cantidad = categoria.totalElements;
      this.dataSource = new MatTableDataSource(categoria.content);
      this.dataSource.sort = this.sort;
    })
  }

  private getReservaCambio() {
    this.categoriaService.getCategoriaCambio().subscribe((data) => {
      this.listarCategoria(data);
    });
  }

  private getMensajeCambio() {
    this.categoriaService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }

  mostrarMas(e: any){
    this.categoriaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(categoria: Categoria){
    let dialogRef = this.dialog.open(ModalComfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    categoria.estado = false;
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.categoriaService.modificar(categoria).pipe(switchMap(()=>{
          return this.categoriaService.listarPageable(0,10);
        }))
        .subscribe(data =>{
          this.categoriaService.setCategoriaCambio(data);
          this.categoriaService.setMensajeCambio("SE ELIMINO");
        })
      }
    })
  }


  openDialog(id?: number) {
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true,
      height: '300px',
      width: '480px',
      data: {
        id: id
      },
    })
  }
}
