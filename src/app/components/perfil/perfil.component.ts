import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/shared/game.service';
import { Game } from 'src/app/models';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit  {

  public perfilName?: string;
  public perfilPhoto?: string;
  public idUser?: string;

  public gamesZerei: Array<Game> = [];
  public gamesJogando: Array<Game> = [];
  public gamesJogarei: Array<Game> = [];

  constructor(public authService: AuthService, public gameService: GameService, private globalService: GlobalService) {
    this.perfilName = authService.displayName;
    this.perfilPhoto = authService.photoUrl;
    this.idUser = authService.idUser;
    

    gameService.getGame(this.idUser!)
  
    

    this.gamesZerei! = gameService.gamesZerei;
    this.gamesJogando! = gameService.gamesJogando;
    this.gamesJogarei! = gameService.gamesJogarei;

  }

  ngOnInit(): void {
    this.globalService.ngOnInit();
  }
  
  refresh(): void {
    window.location.reload();
}


}
