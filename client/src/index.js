import "./css/style.css";
// import "@fortawesome/fontawesome-free/css/all.css";

import Modal from "./components/Modal";
import IdeaForm from "./components/Ideaform";
import IdeaList from "./components/IdeaList";

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
new IdeaList();
