import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Categoria } from 'src/app/_model/categoria';
import { Libro } from 'src/app/_model/libro';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { LibroService } from 'src/app/_service/libro.service';

@Component({
  selector: 'app-modal-libro',
  templateUrl: './modal-libro.component.html',
  styleUrls: ['./modal-libro.component.css']
})
export class ModalLibroComponent implements OnInit {

  categorias$: Observable<Categoria[]>;

  idCategoriaSeleccionada: number;
  libro: Libro;
  formLibro: FormGroup;
  constructor(
    private libroService: LibroService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ModalLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.initFormLibro();
    this.cargarDatosEdicion();
    this.listarcategorias();
  }

  initFormLibro(){
    this.formLibro = new FormGroup({
      idLibro: new FormControl(0, [Validators.required]),
      nombre: new FormControl('', Validators.required),
      autor : new FormControl('', Validators.required),
      paginas : new FormControl(1, Validators.required),
      cantidadDisponible : new FormControl(1, Validators.required),
      cantidadReservada : new FormControl(0),
      tarifa : new FormControl(1, Validators.required),
      categoria : new FormControl(Validators.required)
    });
  }

  private listarcategorias(){
      this.categorias$ = this.categoriaService.listar();
  }

  operar(){
    let categoria = new Categoria();
    categoria.idCategoria = this.idCategoriaSeleccionada;

    let libro = new Libro();
    libro.nombre = this.formLibro.value['nombre'];
    libro.autor = this.formLibro.value['autor'];
    libro.paginas = this.formLibro.value['paginas'];
    libro.cantidadDisponible = this.formLibro.value['cantidadDisponible'];
    libro.cantidadReservada = this.formLibro.value['cantidadReservada'];
    libro.tarifa = this.formLibro.value['tarifa'];
    libro.categoria = categoria;
    libro.estado = true;

    console.log(libro);
    if(this.data.id != 0){

      libro.idLibro = this.data.id;
      this.libroService.modificar(libro).pipe(switchMap(()=>{
        return this.libroService.listar();
      })).subscribe(res =>{
        this.libroService.setLibroCambio(res);
        this.libroService.setMensajeCambio("SE MODIFICO");
        this.dialogRef.close(true);
      });

    }else{
      this.libroService.registrar(libro).pipe(switchMap(()=>{
        return this.libroService.listar();
      })).subscribe(data =>{
        this.libroService.setLibroCambio(data);
        this.dialogRef.close(true);
        this.libroService.setMensajeCambio("SE REGISTRO");
      });
    }
  }

  cargarDatosEdicion(){
    if(this.data.id != 0){
      this.libroService.listarPorId(this.data.id).subscribe(res =>{
          this.formLibro.setValue({
            idLibro :res.idLibro,
            nombre : res.nombre,
            autor : res.autor,
            paginas : res.paginas,
            cantidadDisponible : res.cantidadDisponible,
            cantidadReservada : res.cantidadReservada,
            tarifa : res.tarifa,
            categoria : res.categoria,
          });

          this.idCategoriaSeleccionada = res.categoria.idCategoria
      });
    }
  }

}
