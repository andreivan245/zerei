import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game as GameDB } from 'src/app/services/SharedService/game';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private gameSource = new BehaviorSubject({ game: null, key: '' });
  currentGame = this.gameSource.asObservable();

  changeGame(game: GameDB, key: string) {
    this.gameSource.next({ game: game as any, key: key });
  }
}
