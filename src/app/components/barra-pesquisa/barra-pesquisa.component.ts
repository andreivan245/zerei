import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.css']
})
export class BarraPesquisaComponent {
  constructor(private router: Router) {}

  onSubmit(form:NgForm){
    this.router.navigate(['/games'], { queryParams: { page: '1', ordering: '-metacritic', search: form.value.search  } });
  }
}