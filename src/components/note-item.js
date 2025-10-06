class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body", "date", "archived", "data-id"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  set note(note) {
    this._note = note;
    this.setAttribute("data-id", note.id);
    this.setAttribute("title", note.title);
    this.setAttribute("body", note.body);
    this.setAttribute("date", note.createdAt);
    this.setAttribute("archived", note.archived ? "true" : "false");
    this.render();
  }

  get note() {
    if (this._note) return this._note;
    return {
      id: this.getAttribute("data-id"),
      title: this.getAttribute("title"),
      body: this.getAttribute("body"),
      createdAt: this.getAttribute("date"),
      archived: this.getAttribute("archived") === "true",
    };
  }

  formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("id-ID", options);
  }

  render() {
    const note = this.note;
    if (!note) return;

    this.innerHTML = `
      <h3>${note.title || ""}</h3>
      <small>${this.formatDate(note.createdAt)}</small>
      <p>${note.body || ""}</p>
      <div class="note-item-buttons">
        <button class="delete-button">Hapus</button>
        <button class="archive-button">${
          note.archived ? "Buka Arsip" : "Arsipkan"
        }</button>
      </div>
    `;

    this.querySelector(".delete-button")?.addEventListener("click", (event) => {
      event.stopPropagation();
      this.dispatchEvent(
        new CustomEvent("note-deleted", {
          detail: { noteId: note.id },
          bubbles: true,
        }),
      );
    });

    this.querySelector(".archive-button")?.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        const eventName = note.archived ? "note-unarchived" : "note-archived";
        this.dispatchEvent(
          new CustomEvent(eventName, {
            detail: { noteId: note.id },
            bubbles: true,
          }),
        );
      },
    );
  }
}
customElements.define("note-item", NoteItem);
