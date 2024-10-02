export default class {
    #notepadTextarea;
    #noteId;
    #noteValue;
    constructor(notepadTextarea) {
        this.#notepadTextarea = notepadTextarea;
        this.#init();
    }

    #init = () => {
        this.#notepadTextarea.addEventListener('input', this.#noteContentChanged);
    }

    #getNoteContent = (id) => localStorage.getItem(id) ?? '';

    #updateNoteContent = (value) => {
        this.#noteValue = value;
        this.#notepadTextarea.value = this.#noteValue;
    }

    #noteContentChanged = () => {
        this.#noteValue = this.#notepadTextarea.value;
        this.#saveNoteContent();
    }

    #saveNoteContent = () => {
        localStorage.setItem(this.#noteId, this.#noteValue);
    }

    idChanged = (id) => {
        if (id === this.#noteId) return;

        this.#noteId = id;
        this.#updateNoteContent(this.#getNoteContent(this.#noteId))
    }
}