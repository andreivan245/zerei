import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  public search?: string;
  constructor(
    private router: Router,
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) {}

  onSubmit() {
    this.router.navigate(['/games'], {
      queryParams: { page: '1', ordering: '-metacritic', search: this.search },
    });
  }

  openPerfil(): void {
    this.router.navigate(['perfil']);
  }

  allGames(): void {
    this.router.navigate(['/games'], {
      queryParams: {
        page: '1',
        ordering: '-added',
      },
    });
  }
}
