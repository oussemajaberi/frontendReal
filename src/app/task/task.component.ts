import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Tache } from '../model/taches.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  Taches!: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this. getTachesFromAPI();
  }

  getTachesFromAPI() {
    this.apiService.getTasksUser().subscribe(
      (response: Tache[]) => {
        this.Taches = response.filter((t: any) => t.situation === 'EnCours');
        console.log(this.Taches);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  updateTaskStatus(taskId: number) {
    this.apiService.updateTaskStatus(taskId).subscribe(
      () => {
        console.log("Task status updated successfully.");
        this.Taches = this.Taches.filter((t: Tache) => t.idTache !== taskId);
      },
      (error) => {
        console.error(error);
      }
    );
    window.location.reload();
  }
}