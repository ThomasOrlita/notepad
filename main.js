import notesHistory from './modules/notesHistory.js';
const notesHistoryInstance = new notesHistory(document.querySelector('#notesHistory'), document.querySelector('#deleteNote'));

const getNoteIdFromHash = () => location.hash;

import noteContent from './modules/noteContent.js';
const noteContentInstance = new noteContent(document.querySelector('#notePad'));
noteContentInstance.idChanged(getNoteIdFromHash());


import fileSystem from './modules/fileSystem.js';
const fileSystemInstance = new fileSystem(document.querySelector('#openLocalFile'));

window.addEventListener('hashchange', () => {
    if (getNoteIdFromHash().length <= 1) return;
    notesHistoryInstance.hashChanged();
    noteContentInstance.idChanged(getNoteIdFromHash());
});
