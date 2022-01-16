import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardbookService } from './cardbook.service';


@Component({
  selector: 'app-cardbook',
  templateUrl: './cardbook.component.html',
  styleUrls: ['./cardbook.component.css']
})
export class CardbookComponent implements OnInit {

  data: Array<string> = [];
  error: any;
  backendUrl = "http://localhost:8000"

  constructor(private cardbookService: CardbookService) {}

  ngOnInit() {
    this.showCards()
  }

  showCards() {
    this.cardbookService.getCards(1)
      .subscribe({
        next: (data: Array<string>) => this.data = data, // success path
        error: (error => this.error = error) // error path
      });
  }
}
