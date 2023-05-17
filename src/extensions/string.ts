declare global {
  interface String {
    onlyDigits(): number;
    parseToFloat(): number;
  }
}

String.prototype.onlyDigits = function (): number {
  return +this.replace(/\D/g, '');
};

String.prototype.parseToFloat = function (): number {
  return parseFloat(this.toString());
};
export {}