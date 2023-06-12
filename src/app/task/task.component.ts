import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { Tache } from '../model/taches.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  Taches!: any;
  taskForm: FormGroup;
  hoverCheckIcon = false;
  

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,public dialog: MatDialog) {
    this.taskForm = this.formBuilder.group({
      nomTache: ['', Validators.required] // Assuming 'name' is the form control for the task name
    });
  }

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
  addTask(): void {
    if (this.taskForm.valid) {
      const task = { nomTache: this.taskForm.value.nomTache };
      this.apiService.addTache(task).subscribe(
        (response) => {
          // Handle the success response if needed
          console.log('Task added successfully');
          this.Taches.push(response);
        },
        (error) => {
          // Handle the error if needed
          console.error('Error adding task', error);
        }
      );
      this.taskForm.reset();
    }
  }
  handleKeyPress(event: KeyboardEvent): void {
    event.preventDefault();
  }
  openTaskDialog(taskId: number): void {
    this.apiService.getTaskById(taskId).subscribe(
      (task: Tache) => {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
          width: '600px',
          data: { task: task, project: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // Perform any necessary actions after the dialog is closed
        });
      },
      (error) => {
        console.error('Error fetching task details', error);
      }
    );
  }
}
