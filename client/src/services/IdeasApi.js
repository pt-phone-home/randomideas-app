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

  updateIdea(id, data) {
    return axios.put(`${this.#apiUrl}/${id}`, data);
  }

  delete(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";

    return axios.delete(`${this.#apiUrl}/${id}`, {
      data: {
        username: username,
      },
    });
  }
}

export default new IdeasApi();
