export class DateTime {
  private readonly _date: Date;

  constructor(date: Date) {
    this._date = date;
  }

  get value(): Date {
    return this._date;
  }

  static now(): DateTime {
    return new DateTime(new Date());
  }

  toString(): string {
    return this._date.toString();
  }

  toISOString(): string {
    return this._date.toISOString();
  }
}
