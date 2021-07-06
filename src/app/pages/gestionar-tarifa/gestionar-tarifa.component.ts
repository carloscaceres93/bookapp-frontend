import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Tarifa } from 'src/app/_model/tarifa';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { TarifaService } from 'src/app/_service/tarifa.service';
import { ModalComfirmarComponent } from '../generic/modal-comfirmar/modal-comfirmar.component';
import { ModalTarifaComponent } from './modal-tarifa/modal-tarifa.component';

@Component({
  selector: 'app-gestionar-tarifa',
  templateUrl: './gestionar-tarifa.component.html',
  styleUrls: ['./gestionar-tarifa.component.css']
})
export class GestionarTarifaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Tarifa>;
  displayedColumns: string[] =['nombre','descripcion','estado','acciones'];
  cantidad: number = 0;

  constructor(
    private tarifaService: TarifaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.getReservaCambio();
    this.getMensajeCambio();
    this.listarTarifa();
  }
  private listarTarifa(categoria?: any){
    this.tarifaService.listarPageable(0,10).subscribe(data =>{
      categoria = data;
      this.cantidad = categoria.totalElements;
      this.dataSource = new MatTableDataSource(categoria.content);
      this.dataSource.sort = this.sort;
    })
  }

  private getReservaCambio() {
    this.tarifaService.getTarifaCambio().subscribe((data) => {
      this.listarTarifa(data);
    });
  }

  private getMensajeCambio() {
    this.tarifaService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }

  mostrarMas(e: any){
    this.tarifaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(tarifa: Tarifa){
    let dialogRef = this.dialog.open(ModalComfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    tarifa.estado = false;
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.tarifaService.modificar(tarifa).pipe(switchMap(()=>{
          return this.tarifaService.listarPageable(0,10);
        }))
        .subscribe(data =>{
          this.tarifaService.setTarifaCambio(data);
          this.tarifaService.setMensajeCambio("SE ELIMINO");
        })
      }
    })
  }


  openDialog(id?: number) {
    this.dialog.open(ModalTarifaComponent, {
      disableClose: true,
      height: '300px',
      width: '480px',
      data: {
        id: id
      },
    })
  }
}

