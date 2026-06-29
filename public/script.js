const addBtn = document.getElementById("add");
const container = document.querySelector(".notes-container");

document.addEventListener("DOMContentLoaded", loadNotes);

if (addBtn) {
  addBtn.addEventListener("click", addNewNote);
}

// =====================
// LOAD NOTES
// =====================
async function loadNotes() {
  const res = await fetch("/notes");
  const notes = await res.json();

  container.innerHTML = "";
  notes.forEach((note) => createNote(note));
}

// =====================
// CREATE NOTE
// =====================
function createNote(data = { id: null, title: "", content: "" }) {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="tools">

        <button class="bold"><b>B</b></button>
        <button class="italic"><i>I</i></button>
        <button class="underline"><u>U</u></button>

        <button class="h1">H1</button>
        <button class="list">• List</button>

        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>

    </div>

    <input class="title" placeholder="Judul note..." value="${data.title || ""}">
    <div class="editor" contenteditable="true">${data.content || ""}</div>
    <div class="time">${formatTime(data.updated_at)}</div>
  `;

  const title = note.querySelector(".title");
  const editor = note.querySelector(".editor");

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const boldBtn = note.querySelector(".bold");
  const italicBtn = note.querySelector(".italic");
  const underlineBtn = note.querySelector(".underline");

  const h1Btn = note.querySelector(".h1");
  const listBtn = note.querySelector(".list");

  let timeout = null;

  // =====================
  // FORMAT HELPER
  // =====================
  function format(command, value = null) {
    document.execCommand(command, false, value);
    autosave();
  }

  // =====================
  // BUTTON ACTIONS
  // =====================
  boldBtn.onclick = () => format("bold");
  italicBtn.onclick = () => format("italic");
  underlineBtn.onclick = () => format("underline");

  h1Btn.onclick = () => format("formatBlock", "<h1>");
  listBtn.onclick = () => format("insertUnorderedList");

  // =====================
  // EDIT MODE
  // =====================
  let locked = false;

  editBtn.onclick = () => {
    locked = !locked;
    title.disabled = locked;
    editor.contentEditable = !locked;
  };

  // =====================
  // DELETE
  // =====================
  deleteBtn.onclick = async () => {
    note.remove();

    if (data.id) {
      await fetch(`/notes/${data.id}`, {
        method: "DELETE",
      });
    }
  };

  // =====================
  // AUTOSAVE
  // =====================
  function autosave() {
    clearTimeout(timeout);

    timeout = setTimeout(async () => {
      const payload = {
        title: title.value,
        content: editor.innerHTML,
      };

      if (!data.id) {
        const res = await fetch("/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        data.id = result.id;
      } else {
        await fetch(`/notes/update/${data.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    }, 300);
  }

  editor.addEventListener("input", autosave);
  title.addEventListener("input", autosave);

  container.appendChild(note);
}

// =====================
// ADD NOTE
// =====================
function addNewNote() {
  createNote({
    id: null,
    title: "",
    content: "",
  });
}

// =====================
// FORMAT TIME
// =====================
function formatTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
