import IdeasApi from "../services/IdeasApi";
class IdeaList {
  #ideaListEl = document.getElementById("idea-list");
  #ideas = [];
  #validTags = new Set();

  constructor() {
    this.addTagsToValidTags();
    this.getIdeas();
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas();
      this.#ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this.#ideas.push(idea);
    this.render();
  }

  addTagsToValidTags() {
    this.#validTags.add("technology");
    this.#validTags.add("software");
    this.#validTags.add("business");
    this.#validTags.add("education");
    this.#validTags.add("health");
    this.#validTags.add("inventions");
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this.#validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }
  render() {
    this.#ideaListEl.innerHTML = this.#ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        console.log(tagClass);
        return `<div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
          <h3>
           ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join();
  }
}

export default IdeaList;
