import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Tarifa } from 'src/app/_model/tarifa';
import { TarifaService } from 'src/app/_service/tarifa.service';

@Component({
  selector: 'app-modal-tarifa',
  templateUrl: './modal-tarifa.component.html',
  styleUrls: ['./modal-tarifa.component.css']
})
export class ModalTarifaComponent implements OnInit {

  tarifa: Tarifa;
  formTarifa: FormGroup;
  constructor(
    private tarifaService: TarifaService,
    private dialogRef: MatDialogRef<ModalTarifaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initFormTarifa();
    this.cargarDatosEdicion();
  }
  initFormTarifa(){
    this.formTarifa = new FormGroup({
      idTarifa: new FormControl(0, [Validators.required]),
      nombre: new FormControl('', Validators.required),
      precio :new FormControl(1, Validators.required),
      descripcion : new FormControl('', Validators.required)
    });
  }

  operar(){
    let tarifa = new Tarifa();
    tarifa.nombre = this.formTarifa.value['nombre'],
    tarifa.descripcion = this.formTarifa.value['descripcion'],
    tarifa.precio = this.formTarifa.value['precio']
    tarifa.estado = true;

    if(this.data.id != 0){

      tarifa.idTarifa = this.data.id;
      this.tarifaService.modificar(tarifa).pipe(switchMap(()=>{
        return this.tarifaService.listar();
      })).subscribe(res =>{
        this.tarifaService.setTarifaCambio(res);
        this.tarifaService.setMensajeCambio("SE MODIFICO");
        this.dialogRef.close(true);
      });

    }else{
      this.tarifaService.registrar(tarifa).pipe(switchMap(()=>{
        return this.tarifaService.listar();
      })).subscribe(data =>{
        this.tarifaService.setTarifaCambio(data);
        this.dialogRef.close(true);
        this.tarifaService.setMensajeCambio("SE REGISTRO");
      });
    }
  }

  cargarDatosEdicion(){
    if(this.data.id != 0){
      this.tarifaService.listarPorId(this.data.id).subscribe(res =>{
          this.formTarifa.setValue({
            idTarifa: res.idTarifa,
            nombre: res.nombre,
            descripcion: res.descripcion,
            precio: res.precio
          });
      });
    }
  }

}
