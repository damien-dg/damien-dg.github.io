import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-cardbook',
  templateUrl: './cardbook.component.html',
  styleUrls: ['./cardbook.component.css']
})
export class CardbookComponent implements OnInit {
  title = 'app works!';
  loading: boolean;
  data: string;
  backendUrl = "http://localhost:8000"

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.cards(1);
  }


  cards(page: number): void {
    this.loading = true;
    this.http.request(`${this.backendUrl}/cards?page=${page}`)
    .subscribe((res: Response) => {
      this.data = res.json();
      console.log(this.data)
      this.loading = false;
    });
  }
}
