import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Manga} from "../models/manga";
import {Commentaire} from "../models/commentaire";

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
 // apiUrl = 'http://127.0.0.1:8000';
  apiUrl = 'https://www.apiback.mangatheques.fr'
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient) { }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getCommentaireByIdManga(mangaId): Observable<any> {
      return this.http.get<Commentaire[]>( this.apiUrl + '/api/commentaire?manga=' + mangaId);
  }

  addCommentaire(mangaId, userId, commentaire): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/commentaire/addNewCommentaire', {
      userId: userId,
      mangaId: mangaId,
      commentaire: commentaire,
    })
  }
}
