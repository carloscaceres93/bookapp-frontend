import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit(): void {
    this.listarLibros();
  }

  private listarLibros(){
    this.categoriaService.listar().subscribe(data =>{
      this.categorias = data;
    });
  }

}
