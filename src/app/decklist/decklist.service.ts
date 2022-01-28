import { Injectable } from '@angular/core';
import { CardbookService } from '../cardbook/cardbook.service';
@Injectable({
  providedIn: 'root'
})
export class DecklistService {
  maxDeckSize: number = 50;

  decklist: Map<string, number>;
  constructor(private cardbookService: CardbookService) {
    this.decklist = new Map<string, number>();
  }

  saveDeck() {
    var canvas = document.createElement("canvas");
    canvas.width = 4096;
    canvas.height = 3868;
    var context = canvas.getContext("2d");
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#fff";
      context.fill();

      var myImage = new Image();
      var decklist = this.decklist;
      var entries = decklist.entries();
      var firstCard = decklist.entries().next().value[0]
      myImage.src =  this.cardbookService.getCardUrl(firstCard);
      myImage.crossOrigin = "anonymous";
      let cardHeight = myImage.height;
      let cardWidth = myImage.width;
      let deckWidth = cardWidth * 5;
      var cardPadding = (canvas.width - deckWidth) / 20
      var cardIndex = 0
      var allImagesLoaded = new Array<Boolean>(this.decklist.size).fill(false);
      
      var that = this;
      while (true) {
        let nextEntry = entries.next();
        if (!nextEntry.value) {
          break
        }
        let currentContext = context;
        let card = nextEntry.value[0]
        let cardImage = new Image();
        cardImage.src = this.cardbookService.getCardUrl(card); // Background Pictures Your own local or online pictures
        cardImage.crossOrigin = 'anonymous';
        let currentIndex = cardIndex;
        cardImage.onload = function () {
          if (currentContext) {
            let rowIndex = Math.floor(currentIndex / 10);
            let columnIndex = currentIndex % 10;
            let cardX = cardPadding + (cardWidth * columnIndex);
            let cardY = cardPadding + (cardHeight * rowIndex);
            // console.log(cardX, cardY);
            if (rowIndex != 0) {
              cardX += cardPadding;
            }
            if (columnIndex != 0) {
              cardY += cardPadding;
            }

            currentContext.drawImage(cardImage, cardX, cardY);
            allImagesLoaded[currentIndex] = true;
            that.renderFinalCanvas(allImagesLoaded, canvas);
          }
        }
        

        cardIndex += 1
      }
    }
  }

  renderFinalCanvas(onloadEventResultArray: Array<Boolean>, canvas: HTMLCanvasElement){
    if (onloadEventResultArray.every((elem) => !!elem )) {
      console.log("trying to convert");
      var base64 = canvas.toDataURL("image/png");
      console.log(base64)
    }
  }
}
