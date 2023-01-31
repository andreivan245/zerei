import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public sort: string= '-added';
  public games: Array<Game> = [];
  public previousPage!: string;
  public nextPage!: string;
  public numberPage:  any = 1;
  public firstPage: boolean = true;
 
  

  constructor(private httpService: HttpService, private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    
    this.activatedRoute.queryParamMap.subscribe(params => {
        this.getGames(this.sort,params.get('search'));
    });
  }
  
  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  selectionNewSort(){
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], { queryParams: { page: this.numberPage, ordering: this.sort, search: params.get('search')  } });
  });
  }

  getGames(sort: string, search?: any):void {
    console.log(this.sort)
    
     this.activatedRoute.queryParamMap.subscribe(params => {
        if(params.get('page')){
         this.numberPage  = params.get('page');
        }
      });


    this.httpService
      .getGameList(sort, search, this.numberPage)
      .subscribe((gameList: APIResponse<Game>) => {
        
        this.games = gameList.results;
        this.nextPage = gameList.next;
        this.previousPage = gameList.previous;
        console.log(gameList)
        console.log(this.nextPage)
        console.log(this.previousPage)
        
      });
      
  }


  onNext(){

    this.numberPage++;
    console.log(this.numberPage)
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], { queryParams: { page: this.numberPage, ordering: this.sort, search: params.get('search')  } });
      this.getGames(this.sort, params.get('search'));
  });
    

  }

  onPrevious(){

    this.numberPage--;
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.router.navigate(['/games'], { queryParams: { page: this.numberPage, ordering: this.sort, search: params.get('search')  } });
  });

  }

}
