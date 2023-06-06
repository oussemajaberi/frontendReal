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
  taskCount: number = 0; // Number of tasks variable
  taskCountEncours: number = 0; 
  phaseTotal: number = 0; 



  constructor(private apiService: ApiService, private route: ActivatedRoute
    ) { }

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
        this.loadTaskCount(); // Call loadTaskCount here
        this.loadTaskCountEncours();
        this.loadPhaseesCount();

        console.log("eeeeeeeeeeeeee");
      },
      (error) => {
        console.log('An error occurred:', error);
      }
    );

  }
  loadTaskCount() {
    const projectId = this.project.projetId; // Assuming the project object is available
  
    this.apiService.getTaskCount(projectId).subscribe(
      (count) => {
        this.taskCount = count;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadTaskCountEncours() {
    const projectId = this.project.projetId; // Assuming the project object is available
  
    this.apiService.getTaskCountEncours(projectId).subscribe(
      (count1) => {
        this.taskCountEncours = count1;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  loadPhaseesCount() {
    const projectId = this.project.projetId; // Assuming the project object is available
  
    this.apiService.getPhasesTotal(projectId).subscribe(
      (count) => {
        this.phaseTotal = count;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
