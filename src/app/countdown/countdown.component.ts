import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  private intervalId = 0;
  message = '';
  remainingTime: number;

  @Input()
  seconds;
  @Input() backgroundColor = '#d9d9d9';
  @Input() progressColor = '#4CAF50';
  @Input() width ;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.width = 100;
    this.reset();
    if (this.seconds < 0) {
      clearInterval();
      this.seconds = 5;
    }
  }
  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();
    if (this.remainingTime <= 0 ) {
      this.remainingTime = this.seconds;
    }
  }

  progress() {
    this.width = this.remainingTime * 100 / this.seconds;
  }

  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }
  reset() {
    this.clearTimer()
    if (this.seconds > 0) {
      this.remainingTime = this.seconds;
      this.width = this.remainingTime * 100 / this.seconds;
      this.message = `Click start button to start the Countdown`;
    } else {
      this.remainingTime = 0;
      this.seconds = 0;
    }
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
        this.progress();
      }
      if (this.remainingTime === 0) {
        this.message = 'Blast off!';
        this.clearTimer();
      } else {
        this.message = `T-${this.remainingTime} seconds and counting`;
      }
    }, 500);
  }
}
