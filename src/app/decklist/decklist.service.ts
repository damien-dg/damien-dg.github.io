import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecklistService {

  decklist: Map<string, number>;
  constructor() { 
    this.decklist = new Map<string, number>();

  }
}
