import { Tache } from "./taches.model";

export interface Phase {
    id: number;
    name: string;
    taches?: Tache[];
    // Other properties of the Phase entity
  }
