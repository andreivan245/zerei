import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})


export class SearchBarComponent implements OnInit {

  public isLoggedin?: boolean;
  public socialUser!: SocialUser;

  
 


  constructor(private router: Router,private socialAuthService: SocialAuthService) {}
  
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;

      sessionStorage.setItem("perfil", JSON.stringify(user));
      console.log(this.socialUser);
    });

  }

  onSubmit(form:NgForm){
    this.router.navigate(['/games'], { queryParams: { page: '1', ordering: '-metacritic', search: form.value.search  } });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  openPerfil(): void {
    this.router.navigate(['perfil']);
  }

}