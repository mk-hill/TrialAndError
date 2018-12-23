$(() => {
  const model = {
    init() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    },
    add(obj) {
      const data = JSON.parse(localStorage.notes);
      data.push(obj);
      localStorage.notes = JSON.stringify(data);
    },
    getAllNotes() {
      return JSON.parse(localStorage.notes);
    },
  };

  const octopus = {
    addNewNote(noteStr) {
      model.add({
        content: noteStr,
        date: Date.now(),
      });
      view.render();
    },

    getNotes() {
      return model.getAllNotes().reverse();
    },

    init() {
      model.init();
      view.init();
    },
  };

  var view = {
    init() {
      this.noteList = $('#notes');
      const newNoteForm = $('#new-note-form');
      const newNoteContent = $('#new-note-content');
      newNoteForm.submit((e) => {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val('');
        e.preventDefault();
      });
      view.render();
    },
    render() {
      let htmlStr = '';
      octopus.getNotes().forEach((note) => {
        htmlStr += `<li class="note">${note.content}</li>`;
      });
      this.noteList.html(htmlStr);
    },
  };

  octopus.init();
});
