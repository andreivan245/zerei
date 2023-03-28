import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { GameService } from 'src/app/services/SharedService/GameService/game.service';
import { Game } from 'src/app/models';
import { GlobalService } from 'src/app/services/GlobalService/global.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  public gamesZerei: Array<Game> = [];
  public gamesJogando: Array<Game> = [];
  public gamesJogarei: Array<Game> = [];
  public editing = false;

  constructor(
    public authService: AuthService,
    public gameService: GameService,
    private globalService: GlobalService
  ) {
    gameService.getGame(authService.idUser!);

    this.gamesZerei! = gameService.gamesZerei;
    this.gamesJogando! = gameService.gamesJogando;
    this.gamesJogarei! = gameService.gamesJogarei;
  }

  refresh(): void {
    window.location.reload();
  }

  editGameList(): void {
    this.editing = !this.editing;
  }

  deleteGame(id: string, index: number, gamesList: Array<Game>) {
    const key = this.authService.idUser + id;
    this.gameService.delete(key);
    this.gameService.getGame(this.authService.idUser!);
    gamesList.splice(index, 1);
  }
}
