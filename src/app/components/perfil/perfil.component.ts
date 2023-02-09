import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  public user!: SocialUser;


  ngOnInit(): void {
   
    this.user =  JSON.parse(sessionStorage['perfil']);
    console.log("teste"+this.user)
   
  }
  
}
