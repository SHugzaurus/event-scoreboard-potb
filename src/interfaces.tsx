import internal from "stream";

export interface Player {
    key : string;
    //nom du joueur
    name : string;
    //score du joueur
    score : number;
    //url de l'avatar, à voir comment gérer si on gère
    avatarURL? :string;
}

export interface EventState {
    id:string
    //nom de l'event
    name : string;
    //date de l'event
    date : Date;
    //liste des joueurs
    players : Array<Player>;
    //le titre qu'obtiendra le gagnant
    winnerTitle : string;
    
}

//interface utilisée pour la méthode mise à jour du score d'un joueur
export interface PlayerUpdate {
    id : string;
    //nom du joueur
    name : string;
    //score du joueur - superflu?
    score : number;
    //fonction de mise à jour, à passer en prop du composant
    updateFunction? : any;
}

export interface PodiumData {
    key : string;
    podium: Array<OrderedPlayer>;
    winner: OrderedPlayer;
}

export interface OrderedPlayer {
    key : string;
    //nom du joueur
    name : string;
    //score du joueur
    score : number;
    //url de l'avatar, à voir comment gérer si on gère
    position : number;
}