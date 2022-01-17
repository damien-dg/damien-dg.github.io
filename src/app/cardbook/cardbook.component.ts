import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardbookService } from './cardbook.service';
import { DecklistService } from '../decklist/decklist.service';


@Component({
  selector: 'app-cardbook',
  templateUrl: './cardbook.component.html',
  styleUrls: ['./cardbook.component.scss']
})
export class CardbookComponent implements OnInit {

  data: Array<string> = [];
  error: any;
  backendUrl = "http://localhost:8000"
  page: number = 1;
  constructor(private cardbookService: CardbookService, private decklistService: DecklistService) {}

  ngOnInit() {
    this.showCards(1);
  }

  addCardToDecklist(card: string) {
    this.decklistService.decklist.push(card);
    this.decklistService.decklist.sort();
  } 

  showCards(page: number) {
    if (page >= 1) {
    this.page = page
    this.cardbookService.getCards(this.page)
      .subscribe({
        next: (data: Array<string>) => this.data = data, // success path
        error: (error => this.error = error) // error path
      });
    }
  }
}
