export default class CaesarChipher {
  constructor() {
    if (new.target === CaesarChipher) {
      throw new Error("ABSTRACT CLASS CANNOT BE INITIALISED");
    }
  }
  encode(text, key) {
    return text
      .split("")
      .map((ch) => {
        return String.fromCharCode(parseInt(ch.charCodeAt(0) + key));
      })
      .join("");
  }
}
