import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

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
      (response) => {
        this.Taches = response;
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
        this.Taches = this.Taches.filter((t:any) => t.idTache !== taskId);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
