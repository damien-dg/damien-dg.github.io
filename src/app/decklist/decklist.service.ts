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

  currentDeckSize() {
    let currentSize = 0;
    for (let kv of this.decklist) {
      currentSize += kv[1];
    }
    return currentSize;
  }

  saveDeck() {
    var canvas = document.createElement("canvas");

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
      canvas.height = cardHeight * 7 + 400;
      canvas.width = cardWidth * 10 + 400 * 1.428;
      var cardPaddingX = (canvas.width - 10*cardWidth) / 20
      var cardPaddingY = (canvas.height - 7*cardHeight) / 14
      context.fillStyle = "#808080"
      context.fillRect(canvas.width - (cardWidth + cardPaddingX), canvas.height - (cardHeight + cardPaddingY), 1000000, 100000)
      var cardIndex = 0
      
      let cardArray = new Array<string>();
      for (let nextEntry of decklist.entries()) {
        let i  = 0;
        for (i  = 0; i < nextEntry[1]; i++) {
          cardArray.push(nextEntry[0])
        }
      }
      var allImagesLoaded = new Array<Boolean>(cardArray.length).fill(false);

      for (let nextEntry of cardArray) {
        let currentContext = context;
        let card = nextEntry
        let cardImage = new Image();
        cardImage.src = this.cardbookService.getCardUrl(card); // Background Pictures Your own local or online pictures
        cardImage.crossOrigin = 'anonymous';
        let currentIndex = cardIndex;
        let currentAllImages = allImagesLoaded
        cardImage.onload = function () {
          if (currentContext) {
            let rowIndex = Math.floor(currentIndex / 10);
            let columnIndex = currentIndex % 10;
            console.log("writing card number: ", currentIndex, columnIndex, rowIndex)
            console.log("padding is: ", cardPaddingX, cardPaddingY)
            let totalPaddingX = ((columnIndex * 2) + 1) * cardPaddingX
            let totalPaddingY = ((rowIndex * 2) + 1) * cardPaddingY
            let cardX = totalPaddingX + (cardWidth * columnIndex);
            let cardY = totalPaddingY + (cardHeight * rowIndex);
            console.log("card coords are: ", cardX, cardY);
            currentContext.drawImage(cardImage, cardX, cardY);
            allImagesLoaded[currentIndex] = true;
            let doneLoad = true;
            for (let bool of currentAllImages) {
              if (bool == false){
                doneLoad = false
              }
            }
            if (doneLoad) {
              var base64 = canvas.toDataURL("image/png");
              var img=new Image();
              img.onload=function(){
                  var canvas = document.createElement("canvas");
                  var context = canvas.getContext("2d");
                  if (context) {
                    context.fillStyle = "#fff";
                    context.fill();
                    canvas.width=4096;
                    canvas.height=3686;
                    context.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
                    console.log(canvas.toDataURL());
                  }
              }
              img.src=base64;
            }
          }
          cardImage.onload = null;
        }
      
        cardIndex += 1
      }
    }
  }
}
