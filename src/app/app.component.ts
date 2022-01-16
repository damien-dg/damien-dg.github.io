import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
