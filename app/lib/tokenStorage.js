export default class TokenStorage {
  static key = "mailsort-token";

  static getToken() {
    return localStorage.getItem(TokenStorage.key);
  }

  static set(token) {
    localStorage.setItem(TokenStorage.key, token);
  }

  static remove() {
    localStorage.removeItem(TokenStorage.key);
  }
}
