import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecklistService {
  maxDeckSize: number = 50;
  backendUrl = "http://localhost:8000"
  decklist: Map<string, number>;
  constructor() {
    this.decklist = new Map<string, number>();

  }

  saveDeck() {
    var canvas = document.createElement("canvas");
    canvas.width = 5000;
    canvas.height = 5000;
    var context = canvas.getContext("2d");
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";
      context.fill();

      var myImage = new Image();
      var decklist = this.decklist;
      var backendUrl = this.backendUrl
      var entries = decklist.entries();
      myImage.src = `${backendUrl}/card/${entries.next().value[0]}`; // Background Pictures Your own local or online pictures
      myImage.crossOrigin = 'anonymous';

      myImage.onload = function () {
        if (context) {
          context.drawImage(myImage, 0, 0);

          var myImage2 = new Image();
          myImage2.src = `${backendUrl}/card/${entries.next().value[0]}`; // Your own local or online photos
          myImage2.crossOrigin = 'anonymous';

          myImage2.onload = function () {
            if (context) {
              context.drawImage(myImage2, 700, 700);
              var base64 = canvas.toDataURL("image/png"); //"image/png" here note
              console.log(base64)
            }
          }
        }
      }
    }
  }
}
