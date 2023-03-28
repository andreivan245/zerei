import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/HttpService/http.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { GlobalService } from 'src/app/services/GlobalService/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  gameRating!: number;
  gameId!: string;
  game!: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public authService: AuthService,
    private globalService: GlobalService
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getDetails(this.gameId);
    });
  }

  getDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
      this.gameRating = this.game.metacritic;
    });
  }
}
