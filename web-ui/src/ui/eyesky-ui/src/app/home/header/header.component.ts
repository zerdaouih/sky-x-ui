import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;


  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.isUserLoggedIn = this.loginService.isUserLoggedIn();
  }

}
