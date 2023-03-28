import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, map } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: any,
    page?: any
  ): Observable<APIResponse<Game>> {
    if (search == null) {
      search = '';
    }
    const params = new HttpParams()
      .set('ordering', ordering)
      .set('page', page)
      .set('search_exact', true)
      .set('search', search);

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/api/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameAchievements = this.http.get(
      `${env.BASE_URL}/api/games/${id}/achievements`
    );
    const gameStores = this.http.get(`${env.BASE_URL}/api/games/${id}/stores`);
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/api/games/${id}`);
    const gameTrailerRequest = this.http.get(
      `${env.BASE_URL}/api/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/api/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailerRequest,
      gameAchievements,
      gameStores,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailer: resp['gameTrailerRequest']?.results,
          achievements: resp['gameAchievements']?.results,
          stores_url: resp['gameStores']?.results,
        };
      })
    );
  }
}
