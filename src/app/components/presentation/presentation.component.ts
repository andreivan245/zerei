import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService/auth.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css'],
})
export class PresentationComponent {
  constructor(public authService: AuthService) {}
}
