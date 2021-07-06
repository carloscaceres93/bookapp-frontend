import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Reserva } from 'src/app/_model/reserva';
import { ReservaService } from 'src/app/_service/reserva.service';
import { ModalComfirmarComponent } from '../generic/modal-comfirmar/modal-comfirmar.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Reserva>;
  displayedColumns: string[] =['usuario','libro','cantidad','fechareservacion','fechaDevolucion','acciones'];
  cantidad: number = 0;

  constructor(
    private reservaService: ReservaService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMensajeCambio();
    this.getReservaCambio();
    this.listarReserva();
  }

  private listarReserva(reserva?: any){
    this.reservaService.listarPageable(0, 10).subscribe(data =>{
      reserva = data;
      this.cantidad = reserva.totalElements;
      this.dataSource = new MatTableDataSource(reserva.content);
      this.dataSource.sort = this.sort;
    })
  }

  private getReservaCambio() {
    this.reservaService.getReservaoCambio().subscribe((data) => {
      this.listarReserva(data);
    });
  }

  private getMensajeCambio() {
    this.reservaService.getMensajeCambio().subscribe((data) => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }

  mostrarMas(e: any){
    this.reservaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }

  eliminar(reserva: Reserva){
    let dialogRef = this.dialog.open(ModalComfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",

    });
    reserva.estado = false;
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.reservaService.modificar(reserva).pipe(switchMap(()=>{
          return this.reservaService.listarPageable(0,10);
        }))
        .subscribe(data =>{
          this.reservaService.setReservaCambio(data);
          this.reservaService.setMensajeCambio("SE ELIMINO");
        })
      }
    })
  }
}
