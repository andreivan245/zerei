import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent  {

  constructor(private router: Router,public authService: AuthService,public afAuth: AngularFireAuth) {}
  
  onSubmit(form:NgForm){
    this.router.navigate(['/games'], { queryParams: { page: '1', ordering: '-metacritic', search: form.value.search  } });
  }

  openPerfil(): void {
    this.router.navigate(['perfil']);
  }

  
}