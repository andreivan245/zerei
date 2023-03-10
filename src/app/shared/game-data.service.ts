import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game as GameDB } from './game';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private gameSource = new BehaviorSubject({ game: null, key: '' });
  currentGame = this.gameSource.asObservable();
  constructor() {}

  changeGame(game: GameDB, key: string) {
    this.gameSource.next({ game: game as any, key: key });
  }
}
