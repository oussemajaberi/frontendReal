import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Project } from '../model/project.model';

@Component({
  selector: 'app-project-id',
  templateUrl: './project-id.component.html',
  styleUrls: ['./project-id.component.css']
})
export class ProjectIdComponent implements OnInit {
  project?:any;

  constructor(private apiservice:ApiService) { }

  ngOnInit(): void {
  }
  onProjectClick(projectId: number) {
    this.apiservice.getProjectById(projectId).subscribe(
      (data) => {
        this.project = data;
        console.log(this.project); // Do something with the project data
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
