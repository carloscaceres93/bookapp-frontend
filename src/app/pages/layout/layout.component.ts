import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  menus: Menu[];

  constructor(
    private menuService: MenuService,
    ) { }

  ngOnInit(): void {

    this.menuService.getMenuCambio().subscribe(data => {
      this.menus = data;
      console.log(this.menus);
    });

    this.menuService.listar().subscribe(data =>{
      this.menuService.setMenuCambio(data);
    })
  }
}
