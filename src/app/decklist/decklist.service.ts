import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecklistService {

  decklist: Array<string>;
  constructor() { 
    this.decklist = [];
  }
}
