import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Card } from '../card';

 
@Injectable({
  providedIn: 'root'
})
export class CardbookService {

  imgurClientId: string = "e06620a35d4ad65"
  imgurAlbumUri: string = "https://api.imgur.com/3/album/t0bAS2y"
  cardMetadata: Array<ImgurImage> = [];
  cards: Array<Card> = [];
  constructor(private http: HttpClient) { 
    console.log("BUILDING SERVICE");
    let headers = new HttpHeaders();
    console.log(headers);
    http.get(`${this.imgurAlbumUri}?client_id=${this.imgurClientId}`, {
      headers: headers
    }).pipe(retry(0)).subscribe(res => {
      let response = JSON.parse(JSON.stringify(res));
      this.cardMetadata = response.data.images
      console.log(this.cardMetadata)
      let currentCardList = new Array<Card>();
      for (let meta of this.cardMetadata) {
        let card = new Card(meta.link, meta.tags, meta.height, meta.width);
        currentCardList.push(card)
      }
      this.cards = currentCardList;
      console.log(this.cards);
    });
  }

  
  getCards() {
    return this.cards
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

class ImgurImage {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public datetime: number,
    public type: string,
    public animated: false,
    public width: number,
    public height: number,
    public size: number,
    public views: number,
    public bandwidth: number,
    public vote: number,
    public favorite: boolean,
    public nsfw: boolean,
    public section: string,
    public account_url: string,
    public account_id: number,
    public is_ad: boolean,
    public in_most_viral: boolean,
    public has_sound: boolean,
    public tags: Array<string>,
    public ad_type: number,
    public ad_url: string,
    public edited: string,
    public in_gallery: boolean,
    public link: string
  ){}
}
