import axios from "axios";
class IdeasApi {
  #apiUrl = "http://localhost:8000/api/ideas";
  constructor() {}
  getIdeas() {
    return axios.get(this.#apiUrl);
  }
  createIdea(data) {
    return axios.post(this.#apiUrl, data);
  }
}

export default new IdeasApi();
