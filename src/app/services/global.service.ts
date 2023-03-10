import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../shared/game.service';
import { AuthService } from './auth.service';
import { Game as GameDB } from 'src/app/shared/game';
import { GameDataService } from '../shared/game-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';
import { Game } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class GlobalService implements OnInit {
  game!: GameDB;
  key!: string;
  action?: string;
  listagem?: string;
  modalRef?: BsModalRef;
  nameGameAdd!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private gameDataService: GameDataService,
    private modalService: BsModalService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.game = new GameDB();
    this.gameDataService.currentGame.subscribe(data => {
      if (data.game && data.key) {
        this.game = new GameDB();
        this.game.idUser = data['game']['idUser'];
        this.game.idGame = data['game']['idGame'];
      }
    });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  putZerei(gameId: string) {
    this.listagem = 'Zerou';
    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'zerei';
    this.key = this.authService.idUser! + gameId;

    if (this.key) {
      this.gameService.update(this.game!, this.key);
    } else {
      this.gameService.insert(this.game!, this.key);
    }

    console.log('ZEREI');
  }

  putJogando(gameId: string) {
    this.listagem = 'está jogando';
    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'jogando';
    this.key = this.authService.idUser! + gameId;

    if (this.key) {
      this.gameService.update(this.game!, this.key);
    } else {
      this.gameService.insert(this.game!, this.key);
    }

    console.log('JOGANDO');
  }

  putJogarei(gameId: string) {
    this.listagem = 'ainda vai jogar';
    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'jogarei';
    this.key = this.authService.idUser! + gameId;

    if (this.key) {
      this.gameService.update(this.game!, this.key);
    } else {
      this.gameService.insert(this.game!, this.key);
    }

    console.log('JOGAREI');
  }

  openModal(template: TemplateRef<any>, id: string) {
    this.modalRef = this.modalService.show(template);

    this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      console.log(gameResp);
      this.nameGameAdd = gameResp.name;
    });
  }
}
