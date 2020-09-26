import axios from 'axios';

// Adresa auth controlleru
const API_URL = 'http://localhost:8080/api/auth';

class AuthService {

  // Přihlášení
  signin(login, password) {
    console.log(login, password);
    return axios.post(API_URL + '/signin', {
      login, password
    })
    .then(response => {
      if (response.data.accessToken) {

        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  // Odhlášení
  logout() {
    localStorage.removeItem('user');
  }

  // Registrace zatím není

  // Metoda vrátí info o přihlášeném uživateli
  getCurrentUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    } else {
      window.location.href = '/';
    }
  }
}

export default new AuthService();
