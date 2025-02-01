class Modal {
  #modal = document.getElementById("modal");
  #modalBtn = document.getElementById("modal-btn");
  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.#modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("closeModal", this.close.bind(this));
  }

  open() {
    this.#modal.style.display = "block";
  }

  close() {
    this.#modal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this.#modal) {
      this.close();
    }
  }
}

export default Modal;
