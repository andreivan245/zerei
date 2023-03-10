import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  gameRating = 0;
  gameId!: string;
  game!: Game;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public authService: AuthService,
    private globalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getDetails(this.gameId);
    });

    this.globalService.ngOnInit();
  }
  getDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      console.log(gameResp);
      this.game = gameResp;
      this.gameRating = this.game.metacritic;
    });
  }
}
