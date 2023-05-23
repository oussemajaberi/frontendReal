import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects!: any[];
  constructor(private apiService: ApiService ) { }

  ngOnInit(): void {
    this.getProjectsFromAPI();
  }

  getProjectsFromAPI() {
    this.apiService.getProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
