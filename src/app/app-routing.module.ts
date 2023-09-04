import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { HomeComponent } from './home/home.component';
import { ProjectIdComponent } from './project-id/project-id.component';
import { PhasesComponent } from './phases/phases/phases.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'projects/:projetId', component: ProjectIdComponent },
  { path: 'phases/:projetId', component: PhasesComponent },
  { path: 'projects/:projetId/tasks', component: ProjectTasksComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
