import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css']
})
export class ModalCategoriaComponent implements OnInit {

  categoria: Categoria;
  formCategoria: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initFormCategoria();
    this.cargarDatosEdicion();
  }

  initFormCategoria(){
    this.formCategoria = new FormGroup({
      idCategoria: new FormControl(0, [Validators.required]),
      nombre: new FormControl('', Validators.required),
      descripcion : new FormControl('', Validators.required)
    });
  }

  operar(){
    let categoria = new Categoria();
    categoria.nombre = this.formCategoria.value['nombre'],
    categoria.descripcion = this.formCategoria.value['descripcion'],
    categoria.estado = true;

    if(this.data.id != 0){

      categoria.idCategoria = this.data.id;
      this.categoriaService.modificar(categoria).pipe(switchMap(()=>{
        return this.categoriaService.listar();
      })).subscribe(res =>{
        this.categoriaService.setCategoriaCambio(res);
        this.categoriaService.setMensajeCambio("SE MODIFICO");
        this.dialogRef.close(true);
      });

    }else{
      this.categoriaService.registrar(categoria).pipe(switchMap(()=>{
        return this.categoriaService.listar();
      })).subscribe(data =>{
        this.categoriaService.setCategoriaCambio(data);
        this.dialogRef.close(true);
        this.categoriaService.setMensajeCambio("SE REGISTRO");
      });
    }
  }

  cargarDatosEdicion(){
    if(this.data.id != 0){
      this.categoriaService.listarPorId(this.data.id).subscribe(res =>{
          this.formCategoria.setValue({
            idCategoria: res.idCategoria,
            nombre: res.nombre,
            descripcion: res.descripcion
          });
      });
    }
  }

}
