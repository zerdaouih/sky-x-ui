import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../_helper/auth/jwt/token-storage.service";
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user:any
  constructor(private router: Router,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser()['roles'];
    console.log(" user >>"+ JSON.stringify(this.user))
  }

  logOut(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
    this.router.navigate(['/login']);
  }

}
