import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  {
  public perfilName?: string;
  public perfilPhoto?: string;

  constructor(public authService: AuthService) {
    this.perfilName = authService.displayName;
    this.perfilPhoto = authService.photoUrl;
    console.log(this.perfilPhoto)
  }
  
}
