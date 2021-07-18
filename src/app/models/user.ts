export class User {
  id: number;
  email: string;
  password: string;
  role: Array<any>;
  isActive: boolean;
  mangaLike: Array<any>;
  pseudo: string;
  dateInscription: Date;
  avatar: string;

  constructor(id: number, email: string, password: string, role?: Array<any>, isActive?: boolean, mangaLike?: Array<any>, pseudo?: string, dateInscription?: Date, avatar?:string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
    this.mangaLike = mangaLike;
    this.pseudo = pseudo;
    this.dateInscription = dateInscription;
    this.avatar = avatar;
  }
}
