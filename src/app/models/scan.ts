export class Scan {
  id: number;
  numero: number;
  titre: string;
  dateAjout: Date;
  pages: Array<any>;
  manga: number;

  constructor(id?: number, numero?: number, titre?: string, dateAjout?: Date, pages?: Array<any>, manga?: number) {
    this.id = id;
    this.numero = numero;
    this.titre = titre;
    this.dateAjout = dateAjout;
    this.pages = pages;
    this.manga = manga;
  }
}
