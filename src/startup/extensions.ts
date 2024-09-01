declare global {
  interface Date {
    yyyymmdd: () => string;
    addDays: (days: number) => Date;
  }

  interface Number {
    toMoneyRound: (precision?: number) => number;
  }
}

const setExtensions = () => {
  Date.prototype.yyyymmdd = function () {
    return this.toISOString().slice(0, 10);
  };

  Date.prototype.addDays = function (days: number) {
    return new Date(this.setTime(this.getTime() + days * 86400000));
  };

  Number.prototype.toMoneyRound = function (precision?: number) {
    if (!precision) precision = 2;
    const r: number = Math.pow(10, precision);

    return Math.round((Number(this) + Number.EPSILON) * r) / r;
  };
};

export default setExtensions;
