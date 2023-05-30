import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-id',
  templateUrl: './project-id.component.html',
  styleUrls: ['./project-id.component.css']
})
export class ProjectIdComponent implements OnInit {
  project!: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projetId = Number(params.get('projetId'));
        this.loadProjectDetails(projetId);

    });
  }

  loadProjectDetails(projetId: number) {
    this.apiService.getProjectDetails(projetId).subscribe(
      (response) => {
        this.project = response;
        console.log("eeeeeeeeeeeeee");
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );
  }
}
