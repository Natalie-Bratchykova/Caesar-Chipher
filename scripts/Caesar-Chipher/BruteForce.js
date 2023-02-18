import CaesarChipher from "./caesarChipher.js";

export default class BruteForce extends CaesarChipher {
  constructor(inputedText) {
    super();
    this.inputedText = inputedText;
  }

  doBruteForce() {
    let output = "";
    for (let i = 0; i < 1000; i++) {
      output += `[${i}] ${this.encode(this.inputedText, -i)}\n`;
    }
    return output;
  }
}
