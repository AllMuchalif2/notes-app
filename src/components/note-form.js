class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <h2>Tambah Catatan</h2>
      <form id="noteForm">
        <label>
          Judul:
          <input type="text" name="title" required minlength="3" aria-describedby="titleError"/>
        </label>
        <small id="titleError" style="color:red"></small>

        <label>
          Isi:
          <textarea name="body" required minlength="5" aria-describedby="bodyError"></textarea>
        </label>
        <small id="bodyError" style="color:red"></small>

        <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const form = this.querySelector("#noteForm");
    const titleInput = form.elements["title"];
    const bodyInput = form.elements["body"];

    function validateField(input, errorEl, minLengthMsg) {
      input.addEventListener("input", () => {
        if (input.validity.valid) {
          errorEl.textContent = "";
        } else if (input.validity.valueMissing) {
          errorEl.textContent = "Kolom ini wajib diisi.";
        } else if (input.validity.tooShort) {
          errorEl.textContent = minLengthMsg;
        } else {
          errorEl.textContent = input.validationMessage;
        }
      });
    }

    validateField(
      titleInput,
      this.querySelector("#titleError"),
      "Judul minimal 3 karakter.",
    );
    validateField(
      bodyInput,
      this.querySelector("#bodyError"),
      "Isi catatan minimal 5 karakter.",
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (!form.checkValidity()) {
        titleInput.dispatchEvent(new Event("input"));
        bodyInput.dispatchEvent(new Event("input"));
        return;
      }

      this.dispatchEvent(
        new CustomEvent("note-submitted", {
          detail: { title, body },
          bubbles: true,
        }),
      );

      form.reset();
    });
  }
}
customElements.define("note-form", NoteForm);
