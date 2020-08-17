import { Component, OnInit, HostListener } from '@angular/core';
import { Credentials } from '../shared/interfaces/credentials';

import { AuthService } from '../shared/_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public innerWidth;
  public credentials: Credentials = {};
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  login() {
    console.log(this.credentials);
    this.auth.login(this.credentials).subscribe(
      (res) => this.router.navigate(['/']),
      (err) => console.log('Erro ao fazer login: ', err)
    );
  }
}
