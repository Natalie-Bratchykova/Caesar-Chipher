import CaesarChipher from "./caesarChipher.js";

export default class CaesarDecrypt extends CaesarChipher {
  #key;
  constructor(encryptedText, key) {
    super();
    this.encryptedText = encryptedText;
    this.#key = -key;
  }

  get decryptedText() {
    return this.encode(this.encryptedText, this.#key);
  }
}
