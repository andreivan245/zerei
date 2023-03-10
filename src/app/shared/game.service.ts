import { Injectable } from '@angular/core';
import { Game as GameDB } from './game';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Game } from '../models';

import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  public gamesZerei: Array<Game> = [];
  public gamesJogando: Array<Game> = [];
  public gamesJogarei: Array<Game> = [];
  game!: Game;

  constructor(
    private db: AngularFireDatabase,
    private httpService: HttpService
  ) {}

  insert(game: GameDB, key: string) {
    this.db.database
      .ref('game')
      .child(key)
      .set(game)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(game: GameDB, key: string) {
    this.db
      .list('game')
      .update(key, game)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getAll() {
    return this.db
      .list('game')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...(c.payload.val() as object),
          }));
        })
      );
  }

  delete(key: string) {
    this.db.object(`game/${key}`).remove();
  }

  getGame(idUser: string) {
    this.gamesZerei! = [];
    this.gamesJogando! = [];
    this.gamesJogarei! = [];

    const db = this.db.database;
    const ref = db.ref('game').orderByChild('idUser');

    ref.on(
      'child_added',
      snapshot => {
        if (snapshot.val().idUser == idUser) {
          this.httpService
            .getGameDetails(snapshot.val().idGame)
            .subscribe((gameResp: Game) => {
              this.game = gameResp;

              if (snapshot.val().action == 'zerei') {
                this.gamesZerei.push(this.game);
              }
              if (snapshot.val().action == 'jogando') {
                this.gamesJogando.push(this.game);
              }
              if (snapshot.val().action == 'jogarei') {
                this.gamesJogarei.push(this.game);
              }
            });
        }
      },
      errorObject => {
        console.log('The read failed: ' + errorObject.name);
      }
    );
  }
}
