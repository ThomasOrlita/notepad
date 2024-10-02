export default class {
    #openFileButton;

    constructor(openFileButton) {
        this.#openFileButton = openFileButton;
        this.#init();
    }

    #init = () => {
        this.#openFileButton.addEventListener('click', this.#openFile);
    }

    #openFile = async () => {
        const [fileHandle] = await window.showOpenFilePicker();

        const file = await fileHandle.getFile();
        console.log(file);

        const newNoteId = prompt('Select an ID for this file:', '#' + file.name);

        // todo validate

        localStorage.setItem(newNoteId, await file.text())
        location.hash = newNoteId;
    }
}