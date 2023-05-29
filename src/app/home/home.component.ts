import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile!:any;
  public firstName?: string | null = null;
  public lastName?: string | null = null;

  constructor(public securityService: SecurityService,public kcService:KeycloakService,private router: Router) {

   }

  ngOnInit(): void {
    this.kcService.loadUserProfile().then((profile: KeycloakProfile) => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
    });
  }

}
