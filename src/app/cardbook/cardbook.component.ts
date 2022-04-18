import { Component } from '@angular/core';
import { CardbookService } from './cardbook.service';
import { DecklistService } from '../decklist/decklist.service';
import { MetadataService } from '../metadata/metadata.service';
import { Card } from '../card';


@Component({
  selector: 'app-cardbook',
  templateUrl: './cardbook.component.html',
  styleUrls: ['./cardbook.component.scss']
})
export class CardbookComponent {

  error: any;
  page: number = 1;
  maxCopiesInDeck: number = 4

  constructor(private cardbookService: CardbookService, private decklistService: DecklistService, private metadataService: MetadataService) { }


  cards () {
    return this.cardbookService.getCards() 
  }

  nextPage () {
    this.page += 1
  }
  prevPage () {
    if (this.page >= 1) {
      this.page -=1;
    }
  }
  addCardToDecklist(card: Card) {
    let maxCopiesInDeck = this.maxCopiesInDeck;
    let currentCard = this.metadataService.metadata.get(card);
    if (currentCard) {
      let maxCopiesInDeck = currentCard.get("max_copies_in_deck") || this.maxCopiesInDeck;
    }

    let deckCard = this.decklistService.decklist.get(card);
    if (this.decklistService.currentDeckSize() < this.decklistService.maxDeckSize) {
      if (!deckCard) {
        this.decklistService.decklist.set(card, 1)
      }
      else if (deckCard < maxCopiesInDeck) {
        this.decklistService.decklist.set(card, deckCard + 1)
      }
    }
    
  }

  removeFromDecklist(card: Card) {
    let deckCard = this.decklistService.decklist.get(card);
    if (deckCard) {
      if (deckCard > 1) {
        this.decklistService.decklist.set(card, deckCard - 1);
      } else if (deckCard == 1) {
        this.decklistService.decklist.delete(card);
      }
    }
    return false;
  }


  isMaxClass(card: Card) {
    if (this.isMaxed(card)) {
      return "max-added"
    }
    return ""
  }

  isMaxed(card: Card) {
    let currentCard = this.metadataService.metadata.get(card);
    let maxCopiesInDeck: number | string[] = this.maxCopiesInDeck
    if (currentCard) {
      maxCopiesInDeck = currentCard.get("max_copies_in_deck") || this.maxCopiesInDeck;
    }
      let deckCard = this.decklistService.decklist.get(card);
      if (!deckCard) {
        return false;
      }
      else if (deckCard >= maxCopiesInDeck) {
        {
          return true;
        }
      }
    return false
  }
}
