export class DateHelper {

  static now(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  static parse(value: string): Date {
    const valueDate = new Date(value + "T00:00:00");
    valueDate.setHours(0, 0, 0, 0);
    return valueDate;
  }

  static nowString(): string {
    const today = DateHelper.now();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }
}
