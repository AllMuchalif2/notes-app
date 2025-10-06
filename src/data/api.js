const baseUrl = "https://notes-api.dicoding.dev/v2";
class NotesApi {
  static async getNotes() {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    } else {
      return responseJson.data;
    }
  }

  static async addNote(note) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    };

    const response = await fetch(`${baseUrl}/notes`, options);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }

  static async deleteNote(id) {
    const options = {
      method: "DELETE",
    };

    const response = await fetch(`${baseUrl}/notes/${id}`, options);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }

  static async getArchivedNotes() {
    const response = await fetch(`${baseUrl}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    } else {
      return responseJson.data;
    }
  }

  static async archiveNote(id) {
    const options = {
      method: "POST",
    };

    const response = await fetch(`${baseUrl}/notes/${id}/archive`, options);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }

  static async unArchiveNote(id) {
    const options = {
      method: "POST",
    };

    const response = await fetch(`${baseUrl}/notes/${id}/unarchive`, options);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      throw new Error(responseJson.message);
    }
  }
}

export default NotesApi;
