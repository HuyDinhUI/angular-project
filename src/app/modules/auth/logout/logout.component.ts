import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-managment-product',
  templateUrl: './logout.component.html',
  imports:[]
})

export class LogoutComponent implements OnInit{
    constructor(private authService: AuthService){
      this.authService.logout();
    }
    ngOnInit(): void {
        
    }
}