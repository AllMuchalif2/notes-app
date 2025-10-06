import NotesApi from "./data/api.js";
import "./components/app-bar.js";
import "./components/note-item.js";
import "./components/note-form.js";
import "./components/note-list.js";
import "./components/loading-spin.js";
import "./style.css";

function showLoading(show) {
  const loading = document.querySelector("loading-spin");
  loading.style.display = show ? "flex" : "none";
}

async function renderNotes() {
  const noteList = document.querySelector("note-list");
  if (!noteList) return;
  const notesGridUnarchived = noteList.querySelector("#notesGridUnarchived");
  const notesGridArchived = noteList.querySelector("#notesGridArchived");
  if (!notesGridUnarchived || !notesGridArchived) return;

  notesGridUnarchived.innerHTML = "";
  notesGridArchived.innerHTML = "";

  showLoading(true);
  try {
    const [unarchived, archived] = await Promise.all([
      NotesApi.getNotes(),
      NotesApi.getArchivedNotes(),
    ]);
    unarchived.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("date", note.createdAt);
      noteItem.setAttribute("data-id", note.id);
      noteItem.setAttribute("archived", "false");
      notesGridUnarchived.appendChild(noteItem);
    });
    archived.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("date", note.createdAt);
      noteItem.setAttribute("data-id", note.id);
      noteItem.setAttribute("archived", "true");
      notesGridArchived.appendChild(noteItem);
    });
  } catch (error) {
    notesGridUnarchived.innerHTML = `<p>Gagal memuat catatan: ${error.message}</p>`;
    notesGridArchived.innerHTML = `<p>Gagal memuat catatan: ${error.message}</p>`;
  }
  showLoading(false);
}

window.addEventListener("DOMContentLoaded", () => {
  renderNotes();
});

document.addEventListener("note-submitted", async (e) => {
  const { title, body } = e.detail;
  const newNote = { title, body };
  showLoading(true);
  try {
    await NotesApi.addNote(newNote);
    alert("Catatan berhasil ditambahkan!");
    renderNotes();
  } catch (error) {
    alert("Gagal menambah catatan: " + error.message);
  }
  showLoading(false);
});

document.addEventListener("note-deleted", async (e) => {
  showLoading(true);
  try {
    await NotesApi.deleteNote(e.detail.noteId);
    const confirmed = confirm("Apakah Anda yakin ingin menghapus catatan ini?");
    if (!confirmed) {
      showLoading(false);
      return;
    }
    alert("Catatan berhasil dihapus!");
    renderNotes();
  } catch (error) {
    alert("Gagal menghapus catatan: " + error.message);
  }
  showLoading(false);
});

document.addEventListener("note-archived", async (e) => {
  showLoading(true);
  try {
    await NotesApi.archiveNote(e.detail.noteId);
    alert("Catatan berhasil diarsipkan!");
    renderNotes();
  } catch (error) {
    alert("Gagal mengarsipkan catatan: " + error.message);
  }
  showLoading(false);
});

document.addEventListener("note-unarchived", async (e) => {
  showLoading(true);
  try {
    await NotesApi.unArchiveNote(e.detail.noteId);
    alert("Catatan berhasil dibuka dari arsip!");
    renderNotes();
  } catch (error) {
    alert("Gagal membuka arsip catatan: " + error.message);
  }
  showLoading(false);
});
