import { Utilisateur } from "./Utilisateur.model";

export interface Tache {
    idTache: number;
    status: string;
    nivTache: number;
    nomTache: string;
    user: Utilisateur;
    dateCreation :Date;
  }
