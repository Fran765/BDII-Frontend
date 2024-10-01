import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  clientId: number | null = null;

  constructor(private router: Router) {}

  login() {
    if (this.clientId !== null && !isNaN(this.clientId)) {
      this.router.navigate(['/store', this.clientId]);
    } else {
      alert('Por favor ingrese un ID de cliente válido.');
    }
  }
}
