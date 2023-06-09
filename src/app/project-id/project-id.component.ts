import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from '../model/Utilisateur.model';
import { SearchPipe } from './search.pipe';
import { UserService } from '../services/UserService';

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
  users: Utilisateur[] = [];
  assignedUserIds: string[] = [];
  searchQuery: string = '';
  filteredUsers: Utilisateur[] = [];
  searchText = '';
  equipes!: any;





  constructor(private apiService: ApiService, private route: ActivatedRoute,private userService :UserService
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
        this.loadUsers();
        this.loadEquipes();
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
  loadUsers() {
    this.apiService.getAllUsers().subscribe(
      (users) => {
        this.users = this.userService.getFilteredUsers(users);
        this.filteredUsers = this.users;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadEquipes() {
    this.apiService.getAllEquipes().subscribe(
      (equipes) => {
        this.equipes = equipes;

      },
      (error) => {
        console.error(error);
      }
    );
  }
  assignUserToProject(userId: string) {
    const projectId = this.project.projetId;
    this.apiService.assignUserToProject(projectId, userId).subscribe(
      () => {
        console.log('User assigned to project successfully');
        this.userService.assignUser(userId); // Update the assignedUserIds in the UserService
        this.users = this.userService.getFilteredUsers(this.users); // Update the users array
        this.filteredUsers = this.userService.getFilteredUsers(this.filteredUsers); // Update the filteredUsers array
      },
      (error) => {
        console.error('Error assigning user to project:', error);
      }
    );
  }


}
