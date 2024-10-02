export default class {
    #selectElement;
    #deleteNoteButton;
    #noteIds;

    constructor(selectElement, deleteNoteButton) {
        this.#selectElement = selectElement;
        this.#deleteNoteButton = deleteNoteButton;
        this.#init();
    }

    #updateNodeIds = () => {
        this.#noteIds = Object.keys({ ...localStorage }).filter(key => typeof key === 'string' && key.startsWith('#'));
        if (!this.#noteIds.includes(location.hash)) this.#noteIds.push(location.hash);
    }

    #populateSelectOptions = () => {
        this.#selectElement.replaceChildren();
        for (const noteId of this.#noteIds) {
            const optionElement = document.createElement('option');
            optionElement.value = noteId;
            optionElement.textContent = noteId;
            this.#selectElement.appendChild(optionElement);
        }
    }

    #selectValueChanged = () => {
        location.hash = this.#selectElement.value;
    }

    #updateSelectedValue = () => {
        this.#selectElement.value = location.hash;
    }

    hashChanged = () => {
        this.#updateNodeIds();
        this.#populateSelectOptions();
        this.#updateSelectedValue();
    }

    #deleteNote = (noteId) => {
        localStorage.removeItem(noteId);
        location.hash = '#default';
    };

    #deleteCurrentNote = () => {
        if (!confirm(`Delete note ${location.hash}?`)) return;

        this.#deleteNote(location.hash);
    };

    #init = () => {
        if (location.hash.length <= 1) {
            location.hash = /*this.#noteIds[0] ??*/ '#default';
        }

        this.hashChanged();

        this.#selectElement.addEventListener('change', this.#selectValueChanged);
        this.#deleteNoteButton.addEventListener('click', this.#deleteCurrentNote);
    }
}