import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/_model/usuario';
import { UsuarioService } from 'src/app/_service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  formUsuario: FormGroup;


  constructor(
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initFormUsuario();
  }

  initFormUsuario(){
    this.formUsuario = new FormGroup({
      idUsuario: new FormControl(0, [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [Validators.required]),
      confirmarContraseña: new FormControl('', [Validators.required]),
    });
  }

  registrar(){
    let usuario = new Usuario();
    usuario.username = this.formUsuario.value['username'];
    usuario.password = this.formUsuario.value['contraseña'];
    usuario.estado = true;

    if(this.formUsuario.value['contraseña'] !== this.formUsuario.value['confirmarContraseña']){
      this.snackBar.open('La contraseña no coincide', 'Splash', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
      });
    }else{
      console.log(usuario);
      this.usuarioService.registrar(usuario).subscribe(data=>{
        this.usuarioService.setMensajeCambio("SE MODIFICO");
        this.router.navigate(['/login']);
      })
    }


  }
}
