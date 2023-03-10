import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { Game as GameDB } from 'src/app/shared/game';
import { GameService } from 'src/app/shared/game.service';
import { GameDataService } from 'src/app/shared/game-data.service';
import { GlobalService } from 'src/app/services/global.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public sort = '-added';
  public games: Array<Game> = [];
  public previousPage!: string;
  public nextPage!: string;
  public numberPage: any = 1;
  public firstPage = true;
  public totalPages!: number;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.getGames(this.sort, params.get('search'));
    });

    this.globalService.ngOnInit();
  }

  selectionNewSort() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], {
        queryParams: {
          page: '1',
          ordering: this.sort,
          search: params.get('search'),
        },
      });
    });
  }

  getGames(sort: string, search?: any): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.get('page')) {
        this.numberPage = params.get('page');
      }
    });

    this.httpService
      .getGameList(sort, search, this.numberPage)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.nextPage = gameList.next;
        this.previousPage = gameList.previous;
        this.totalPages = gameList.count;
      });
  }

  getPage(event: any) {
    this.numberPage = event.page;
    console.log(event);
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], {
        queryParams: {
          page: this.numberPage,
          ordering: this.sort,
          search: params.get('search'),
        },
      });
    });
  }
}
