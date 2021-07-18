export class Library {
  id: number;
  userId: number;
  manga: any;
  status: string;
  notePerso: string;

  constructor(id?: number, userId?: number, manga?: any, status?: string, notePerso?: string) {
    this.id = id;
    this.userId = userId;
    this.manga = manga;
    this.status = status;
    this.notePerso = notePerso;
  }
}
