class AppBar extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Notes App";
    this.innerHTML = `<header>${title}</header>`;
  }
}
customElements.define("app-bar", AppBar);
