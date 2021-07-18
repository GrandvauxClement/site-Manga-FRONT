export class Manga {
  id: number;
  name: string;
  synopsis: string;
  type: string;
  style: string;
  genre: Array<any>;
  presentation: string;
  author: string;
  prepublierChez: string;
  nombreTitreJapon: number;
  nombreTitreFrance: number;
  editeurJapon: string;
  editeurFrance: string;
  dateDebut: Date;
  dateFin: Date;
  image: Array<any>;
  note: number;
  scenariste: string;
  url: string;
  nameDirectoryOfScan: string;

  constructor(id?: number, name?: string, synopsis?: string, type?: string, style?: string, genre?: Array<any>, presentation?: string, author?: string, prepublierChez?: string, nombreTitreJapon?: number, nombreTitreFrance?: number, editeurJapon?: string, editeurFrance?: string, dateDebut?: Date, dateFin?: Date, image?: Array<any>, note?: number, scenariste?: string, url?: string, nameDirectoryOfScan?: string) {
    this.id = id;
    this.name = name;
    this.synopsis = synopsis;
    this.type = type;
    this.style = style;
    this.genre = genre;
    this.presentation = presentation;
    this.author = author;
    this.prepublierChez = prepublierChez;
    this.nombreTitreJapon = nombreTitreJapon;
    this.nombreTitreFrance = nombreTitreFrance;
    this.editeurJapon = editeurJapon;
    this.editeurFrance = editeurFrance;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.image = image;
    this.note = note;
    this.scenariste = scenariste;
    this.url = url;
    this.nameDirectoryOfScan = nameDirectoryOfScan;
  }
}
