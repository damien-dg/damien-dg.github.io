import { Injectable } from '@angular/core';
import { Card } from '../card';
import { CardbookService } from '../cardbook/cardbook.service';
@Injectable({
  providedIn: 'root'
})
export class DecklistService {
  maxDeckSize: number = 50;

  decklist: Map<Card, number>;
  constructor(private cardbookService: CardbookService) {
    this.decklist = new Map<Card, number>();
  }

  currentDeckSize() {
    let currentSize = 0;
    for (let kv of this.decklist) {
      currentSize += kv[1];
    }
    return currentSize;
  }

  downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      var firstCard = decklist.entries().next().value[0]
      myImage.src =  firstCard.link;
      myImage.crossOrigin = "anonymous";
      let cardHeight = myImage.height;
      let cardWidth = myImage.width;
      canvas.height = cardHeight * 7;
      canvas.width = cardWidth * 10;
      let canvasAspectRatio = canvas.height / canvas.width;
      var cardPaddingX = (canvas.width - 10*cardWidth) / 20
      var cardPaddingY = (canvas.height - 7*cardHeight) / 14
      context.fillStyle = "#808080"
      context.fillRect(canvas.width - (cardWidth + cardPaddingX), canvas.height - (cardHeight + cardPaddingY), 1000000, 100000)
      var cardIndex = 0
      
      let cardArray = new Array<Card>();
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
        cardImage.src = card.link; // Background Pictures Your own local or online pictures
        cardImage.crossOrigin = 'anonymous';
        let currentIndex = cardIndex;
        let currentAllImages = allImagesLoaded
        let downloadURI = this.downloadURI;
        cardImage.onload = function () {
          if (currentContext) {
            let rowIndex = Math.floor(currentIndex / 10);
            let columnIndex = currentIndex % 10;
            let totalPaddingX = ((columnIndex * 2) + 1) * cardPaddingX
            let totalPaddingY = ((rowIndex * 2) + 1) * cardPaddingY
            let cardX = totalPaddingX + (cardWidth * columnIndex);
            let cardY = totalPaddingY + (cardHeight * rowIndex);
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
              downloadURI(base64, "deck.png");
              // var img=new Image();
              // var origingalCanvas = canvas;
              // img.onload=function(){
              //     var canvas = document.createElement("canvas");
              //     var context = canvas.getContext("2d");
              //     if (context) {
              //       context.fillStyle = "#fff";
              //       context.fill();
              //       canvas.width= 4096;
              //       canvas.height= 4096 * canvasAspectRatio;
              //       context.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
              //       let dataUrl = canvas.toDataURL();

              //     }
              // }
              // img.src=base64;
            }
          }
          cardImage.onload = null;
        }
      
        cardIndex += 1
      }
    }
  }
}
