import IdeasApi from "../services/IdeasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  #formModal = document.getElementById("form-modal");
  #form = null;
  #ideaList = new IdeaList();
  constructor() {
    this.render();
    this.addEventListeners();
  }
  addEventListeners() {
    this.#form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(e) {
    e.preventDefault();
    const idea = {
      text: this.#form.elements.text.value,
      tag: this.#form.elements.tag.value,
      username: this.#form.elements.username.value,
    };

    // Add idea to server
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to front end
    this.#ideaList.addIdeaToList(newIdea.data.data);

    // clear fields
    this.#form.elements.text.value = "";
    this.#form.elements.tag.value = "";
    this.#form.elements.username.value = "";

    document.dispatchEvent(new Event("closeModal"));
  }
  render() {
    this.#formModal.innerHTML = `<form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>`;

    this.#form = document.getElementById("idea-form");
    this.addEventListeners();
  }
}

export default IdeaForm;
