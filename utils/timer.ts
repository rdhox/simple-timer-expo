import Timer from "../screens/Timer";

type FN = (...args: any) => any;

type Parse = {
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export class StopWatchTimer {
  maxTime: number | null;
  granularity: number;
  tickFtns: FN[];
  running: boolean;
  idTimer: NodeJS.Timeout | number | null;
  whenFinished?: FN;
  chrono: number | null;
  isPaused: boolean;
  timeWhenPaused: number | null;

  constructor(
    maxTime: number,
    granularity: number = 1000,
    func?:FN)
   {
    this.maxTime = maxTime || null;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
    this.idTimer = null;
    this.whenFinished = func;
    this.chrono = 0;
    this.isPaused = false;
    this.timeWhenPaused = 0;
  }

  start = () => {
    if (this.running) {
      return;
    }
    this.running = true;
    const start = Date.now();
    const that = this;
    let obj: Parse;

    (function timer() {
      if (that.isPaused) {
        that.chrono = Math.floor((Date.now() - start) / 1000) + (that.timeWhenPaused as number);
      } else {
        that.chrono = Math.floor((Date.now() - start) / 1000);
      }

      if (that.maxTime && that.chrono < that.maxTime) {
        that.idTimer = setTimeout(timer, that.granularity);
      } else {
        that.chrono = that.maxTime;
        that.running = false;
        if(that.whenFinished) {
          that.whenFinished();
        }
      }

      obj = that.parse(that.chrono as number);
      that.tickFtns.forEach(ftn => {
        ftn.call(this, obj.minutes, obj.seconds, obj.totalSeconds);
      }, that);
    })();

    
  };

  onTick = (ftn: FN) => {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn);
    }
    return this;
  };

  expired = () => !this.running;

  stop = () => {
    clearTimeout(this.idTimer as number);
    this.chrono = 0;
    this.running = false;
    this.isPaused = false;
    this.timeWhenPaused = 0;
  };

  pause = () => {
    clearTimeout(this.idTimer as number);
    this.timeWhenPaused = this.chrono;
    this.isPaused = true;
    this.running = false;
  };

  parse = (seconds: number): Parse => ({
    minutes: (seconds / 60) | 0,
    seconds: seconds % 60 | 0,
    totalSeconds: seconds,
  });

  getChrono = () => {
    return this.parse(this.chrono as number);
  };
}