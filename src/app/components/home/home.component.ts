import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/HttpService/http.service';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { GlobalService } from 'src/app/services/GlobalService/global.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public sort = '-added';
  public games: Array<Game> = [];
  public previousPage!: string;
  public nextPage!: string;
  //public numberPage: any = 1;
  public totalPages!: number;
  public isSearch = true;
  public currentPage = 1;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private globalService: GlobalService
  ) {
    console.log(this.currentPage);
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.getGames(this.sort, params.get('search'), this.currentPage);
      if (params.get('page') != '1') {
        this.currentPage = parseInt(params.get('page')!);
      }
    });
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

  getGames(sort: string, search?: any, page?: any): void {
    if (search != null) {
      this.isSearch = false;
    }

    this.httpService
      .getGameList(sort, search, page)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        this.nextPage = gameList.next;
        this.previousPage = gameList.previous;
        this.totalPages = gameList.count / 2;
      });
  }

  getPage(event: any) {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], {
        queryParams: {
          page: event.page,
          ordering: this.sort,
          search: params.get('search'),
        },
      });
    });
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
