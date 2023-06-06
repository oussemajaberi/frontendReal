import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userProfile!:any;
  selectedOption: string = 'Semaine';
  public firstName?: string | null = null;
  public lastName?: string | null = null;
  currentDate!: any;

  constructor(public securityService: SecurityService,public kcService:KeycloakService,private router: Router,private datePipe: DatePipe) {

   }

  ngOnInit(): void {
    const today = new Date();
    this.currentDate = this.datePipe.transform(today, 'EEEE d MMMM','fr');
    this.kcService.loadUserProfile().then((profile: KeycloakProfile) => {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
    });

  }

}
