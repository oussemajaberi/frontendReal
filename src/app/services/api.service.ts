   import { Injectable } from "@angular/core";
    import { HttpClient, HttpHeaders } from "@angular/common/http";
    import { Observable, throwError } from "rxjs";
    import { SecurityService } from "./security.service";
    import {KeycloakEventType, KeycloakService} from "keycloak-angular";


    @Injectable({ providedIn: 'root' })
    export class ApiService {
      private baseUrl = 'http://localhost:9091';
      private apiUrl = 'http://localhost:9091/projects';

      constructor(
        private http: HttpClient,
        private securityService: SecurityService,
        private keycloakservice :KeycloakService
      ) {}

      getProjects(): Observable<any> {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.securityService.token}`
        );


        const creatorId = this.keycloakservice.getKeycloakInstance().subject; // Retrieve the user ID
        console.log(creatorId + "abcdefg")

        if (!creatorId) {
          console.error('User ID is not available.'); // Log an error if the user ID is null
          return throwError('User ID is not available.');
        }

        return this.http.get<any>(`${this.baseUrl}/projects/creator/${creatorId}`, {
          headers,
        });
      }


      /*this the add project api*/
      addProject(project?: any): Observable<any>  {
        const createdBy = this.keycloakservice.getKeycloakInstance().subject;
        const url = `${this.baseUrl}/projects/add/${createdBy}`;
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ${this.securityService.token}'); // Replace with your access token from Keycloak
          return this.http.post(url, project, { headers });
      }

      /*this is getproject by id */


      /*get project by id */
      getProjectDetails(projetId?: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/projects/${projetId}`);
      }
      getTaskCount(projectId: number): Observable<number> {
        const url = `${this.apiUrl}/${projectId}/taskcount`;
        return this.http.get<number>(url);
      }
      getTaskCountEncours(projectId: number): Observable<number> {
        const url = `${this.apiUrl}/${projectId}/tasktEncours`;
        return this.http.get<number>(url);
      }
      getPhasesTotal(projectId: number): Observable<number> {
        const url = `${this.apiUrl}/${projectId}/phasecount`;
        return this.http.get<number>(url);
      }

      /*hethi gettaskbycreator */
      getTasksUser(): Observable<any> {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${this.securityService.token}`
        );


        const creatorId = this.keycloakservice.getKeycloakInstance().subject; // Retrieve the user ID

        if (!creatorId) {
          console.error('User ID is not available.'); // Log an error if the user ID is null
          return throwError('User ID is not available.');
        }

        return this.http.get<any>(`${this.baseUrl}/taches/creator/${creatorId}`, {
          headers,
        });
      }

      updateTaskStatus(taskId: number): Observable<string> {
        const url = `${this.baseUrl}/taches/${taskId}/status`;
        return this.http.put<string>(url, null);
      }


    }
