import axios from 'axios';
import authHeader from './authHeader';

// Adresa Rest API našeho projektu
const API_URL = 'http://localhost:8080/api';

class UserService {
  /* TODO:
    Seznam endpointu
  */

  getStudentMainPage() {
    return axios.get(API_URL + "/student")
  }
}

export default new UserService();
