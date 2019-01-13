export class Ticket {

  constructor(time, open, high, low, close,volume) {

    this.time = time;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.volume = volume;
  }
  public time: number;
  public open: number;
  public high: number;
  public low: number;
  public close: number;
  public volume: number;


}
