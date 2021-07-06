import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Libro } from 'src/app/_model/libro';
import { Reserva } from 'src/app/_model/reserva';
import { Usuario } from 'src/app/_model/usuario';
import { LibroService } from 'src/app/_service/libro.service';
import { ReservaService } from 'src/app/_service/reserva.service';
import { UsuarioService } from 'src/app/_service/usuario.service';
import * as moment from 'moment';
import { ModalComfirmarComponent } from '../../generic/modal-comfirmar/modal-comfirmar.component';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-reservar',
  templateUrl: './modal-reservar.component.html',
  styleUrls: ['./modal-reservar.component.css']
})
export class ModalReservarComponent implements OnInit {

  fechaSeleccionada: Date = new Date();

  libro: Libro = new Libro();
  reserva: Reserva = new Reserva();
  usuario: Usuario = new Usuario();
  pagoTotal: number = 0;

  formReserva : FormGroup;

  constructor(
    private libroService: LibroService,
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<ModalReservarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.cargardatosLibro();
    this.initFromReserva();
    this.cargardatosUsuario();
  }

  initFromReserva(){
    this.formReserva = new FormGroup({
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
      fechaDevolucion: new FormControl(new Date(), Validators.required)
    });
  }

  private cargardatosUsuario(){

    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    let usuarioNombre = decodedToken.user_name;

    this.usuarioService.findOneByUsername(usuarioNombre).subscribe(data =>{
      this.usuario = data;
    })
  }

  private cargardatosLibro(){
    this.libroService.listarPorId(this.data.id).subscribe(data =>{
      this.libro = data;
      this.calcularPago();
    })
  }

  operar(){
    let reserva: Reserva = new Reserva();
    reserva.libro = this.libro;
    reserva.usuario = this.usuario;
    reserva.cantidad = this.formReserva.value['cantidad'];
    reserva.fechaDevolucion = moment(this.formReserva.value['fechaDevolucion']).format('YYYY-MM-DD');
    reserva.fechareservacion = moment().format('YYYY-MM-DD');
    reserva.estado = true;

    let dialogRef = this.dialog.open(ModalComfirmarComponent,{
      disableClose: true,
      height : "200px",
      width: "300px",
    });
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.reservaService.registrar(reserva).pipe(switchMap(()=>{
          return this.libroService.listar();
        }))
        .subscribe(data =>{
          this.libroService.setLibroCambio(data);
          this.reservaService.setMensajeCambio("SE HA REALIZADO LA RESERVA");
          this.dialogRef.close(true);
          this.router.navigate(['/pages/inicio']);
        })
      }
    })
  }

  calcularPago(){
    let tarifa: number = this.libro.tarifa.precio;
    let cantidad: number = this.formReserva.value['cantidad'];

     this.pagoTotal = tarifa * cantidad;
  }
}
