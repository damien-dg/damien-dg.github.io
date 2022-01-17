import { Component, OnInit } from '@angular/core';
import { DecklistService } from './decklist.service';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.scss']
})
export class DecklistComponent implements OnInit {

  cardList: Array<string>;
  constructor(public decklistService: DecklistService) { 
    this.cardList = decklistService.decklist
  }

  ngOnInit(): void {
  }

}
