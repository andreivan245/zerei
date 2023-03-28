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
export class HomeComponent implements OnInit {
  public sort = '-added';
  public games: Array<Game> = [];
  public previousPage!: string;
  public nextPage!: string;
  public numberPage: any = 1;
  public totalPages!: number;
  public isSearch = true;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.activatedRoute.queryParamMap.subscribe(params => {
      this.getGames(this.sort, params.get('search'));
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

  getGames(sort: string, search?: any): void {
    if (search != null) {
      this.isSearch = false;
    }

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
        this.totalPages = gameList.count / 2;
      });
  }

  getPage(event: any) {
    this.numberPage = event.page;

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], {
        queryParams: {
          page: this.numberPage,
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
