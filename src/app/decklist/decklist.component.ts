import { Component, OnInit } from '@angular/core';
import { CardbookService } from '../cardbook/cardbook.service';
import { DecklistService } from './decklist.service';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.scss']
})
export class DecklistComponent implements OnInit {

  cardList: Map<string, number>;
  constructor(public decklistService: DecklistService, private cardbookService: CardbookService) { 
    this.cardList = decklistService.decklist
  }


  ngOnInit(): void {
  }

  getCardUrl(card: string) {
    return this.cardbookService.getCardUrl(card);
  }

}
