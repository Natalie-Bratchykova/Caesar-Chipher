import CaesarChipher from "./caesarChipher.js";
export default class CaesarEncrypt extends CaesarChipher {
  #key;

  constructor(inputedText, key) {
    super();
    this.inputedText = inputedText;
    this.#key = key;
  }
  get encryptedText() {
    return this.encode(this.inputedText, this.#key);
  }
}
