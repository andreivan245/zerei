import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../shared/game.service';
import { AuthService } from './auth.service';
import { Game as GameDB } from 'src/app/shared/game';
import { GameDataService } from '../shared/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService implements OnInit{
  game!: GameDB;
  key!: string;
  action?: string;

  constructor(private router: Router,private authService: AuthService, 
    private gameService: GameService,private activatedRoute: ActivatedRoute, private gameDataService: GameDataService, ) { }

    ngOnInit(): void {
    
   
  
      this.game = new GameDB();
      this.gameDataService.currentGame.subscribe(data => {
        if (data.game && data.key) {
          this.game = new GameDB();
          this.game.idUser = data['game']['idUser'];
          this.game.idGame = data['game']['idGame'];
              
        }
      })
      
    }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  putZerei(gameId: string){
   
  
    
    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'zerei'
    this.key = this.authService.idUser!+gameId;
    

    if(this.key) {
      this.gameService.update(this.game!, this.key);
    }else {
      this.gameService.insert(this.game!,this.key)
    }

    console.log("ZEREI")
  }

  putJogando(gameId: string){
    
    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'jogando'
    this.key = this.authService.idUser!+gameId;

    if(this.key) {
      this.gameService.update(this.game!, this.key);
    }else {
      this.gameService.insert(this.game!,this.key)
    }

    console.log("JOGANDO")
  }

  putJogarei(gameId: string){

    this.game.idUser = this.authService.idUser!;
    this.game.idGame = gameId;
    this.game.action = 'jogarei'
    this.key = this.authService.idUser!+gameId;

    if(this.key) {
      this.gameService.update(this.game!, this.key);
    }else {
      this.gameService.insert(this.game!,this.key)
    }
    

    console.log("JOGAREI")
  }
}
