export class Commentaire {
  id: number;
  manga: any;
  user: any;
  commentaire: string;
  dateAjout: Date

  constructor(id: number, manga: any, user: any, commentaire: string, dateAjout: Date) {
    this.id = id;
    this.manga = manga;
    this.user = user;
    this.commentaire = commentaire;
    this.dateAjout = dateAjout;
  }
}
