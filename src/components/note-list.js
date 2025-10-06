class NoteList extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section>
        <h2>Catatan</h2>
        <div id="notesGridUnarchived" class="notes-grid"></div>
      </section>
      <section>
        <h2>Arsip</h2>
        <div id="notesGridArchived" class="notes-grid"></div>
      </section>
    `;
  }
}
customElements.define("note-list", NoteList);
