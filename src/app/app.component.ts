import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  startTime: string;
  endTime: string;
  answer: boolean = false;
  showSpinner: boolean = false;
  finalNumber: number;
  hoursOfDay = [];

  constructor() {

    //Create an array to designate the amount of bell tolls possible
    for (let i = 0; i <= 11; i++) {
      this.hoursOfDay.push(i+1);
    
    }
    console.log(this.hoursOfDay);
  }
  
  showAnswer() {


    this.showSpinner = true;
    this.answer = false;

    this.finalNumber = this.countBells(this.startTime, this.endTime);

    setTimeout(() => {
      this.answer = true;
      this.showSpinner = false;
    }, 1000);
  }

  //method that counts the number of bells
  countBells(start:string, end:string) {

    let finalNumber:number = 0;
    let startNumber:number;
    let endNumber:number;

    startNumber = this.timeToFloat(start);

    endNumber = this.timeToFloat(end);


    //if the start time equals the end time, it means that 24 hours have passed; thus, the number of tolls will always be the same
    if (start === end) {

      return finalNumber = 156;

    } else {

      //if start time does not start exactly at 00 minutes, skip it and start counting from the next hour
      if (startNumber !== Math.floor(startNumber) && endNumber === Math.floor(endNumber)) {

        startNumber = this.convertTime(Math.floor(startNumber + 1));
      }

      //it doesn't matter if the end time is a round number or not, the bell will toll irrespective; however, to ensure that the code doesn't break, we still floor the number
      else if (endNumber !== Math.floor(endNumber) && startNumber === Math.floor(startNumber)) {
        
        endNumber = this.convertTime(Math.floor(endNumber));
      } else if (startNumber !== Math.floor(startNumber) && endNumber !== Math.floor(endNumber)) {

        startNumber = this.convertTime(Math.floor(startNumber + 1));
        endNumber = this.convertTime(Math.floor(endNumber));
      } else {

        //if both numbers, however, are rounded, we just proceed as normal
        startNumber = this.convertTime(startNumber);
        endNumber = this.convertTime(endNumber);}

    }

    if (startNumber < endNumber) {

      for (let i = startNumber; i <= endNumber; i++) {
        finalNumber+= this.hoursOfDay[i-1];
      }
    } else if (startNumber > endNumber) {

      for (let i = startNumber; i <= this.hoursOfDay.length; i++) {

        finalNumber+= this.hoursOfDay[i-1];
      }

      let secondLoop = this.secondLoop(endNumber);
      finalNumber += secondLoop;
    } else if (startNumber === endNumber) {
      
        finalNumber+= this.hoursOfDay[endNumber -1];
      
    }

    return finalNumber;
  }

  //you can't have to consecutive for loops, so I've 'outsourced' it into a single method
  secondLoop(number) {
   
    let result: number = 0;
    for (let i = 0; i < number; i++) {
      
      result+=this.hoursOfDay[i];
    }

    return result;
  }

  //method transforms hours:mins into floats
  timeToFloat(time:string) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }

  //method converts the hours (0-23) into the number of tolls each one respresents
  convertTime(time) {
    
    if (time === 1 || time === 13) {
      return 1;
    }

    if (time === 2 || time === 14) {
      return 2;
    }

    if (time === 3 || time === 15) {
      return 3;
    }

    if (time === 4 || time === 16) {
      return 4;
    }

    if (time === 5 || time === 17) {
      return 5;
    }

    if (time === 6 || time === 18) {
      return 6;
    }

    if (time === 7 || time === 19) {
      return 7;
    }

    if (time === 8 || time === 20) {
      return 8;
    }

    if (time === 9 || time === 21) {
      return 9;
    }

    if (time === 10 || time === 22) {
      return 10;
    }

    if (time === 11 || time === 23) {
      return 11;
    }

    if (time === 12 || time === 0 || time == 24) {
      return 12;
    }
  }


}
