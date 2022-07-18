const addNote = document.getElementById("addNote");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  // console.log(textAreaData);

  textAreaData.forEach((curNote) => {
    return notes.push(curNote.value);
  });
  // console.log(notes);

  localStorage.setItem("notes", JSON.stringify(notes));

}

const addNewNote = (text = '') => {

  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${ text ? "" : "hidden" }"></div>

    <textarea class="${ text ? "hidden" : "" }"></textarea>
  `;
  note.insertAdjacentHTML("afterbegin",htmlData);
  // console.log(note);

  // Getting the references of edit and Delete Icon

  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  // deleting the note 
  delButton.addEventListener('click',() => {
    note.remove();
    updateLSData();
  });

  // editing the note
  textarea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click",() => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change",(event) => {
    const value = event.target.value;
    // console.log(value);
    mainDiv.innerHTML = value;

    updateLSData();
  })

  document.body.appendChild(note);

}

// Getting data from local Storage 
const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
  notes.forEach((Curnote) => addNewNote(Curnote))
}

addNote.addEventListener("click",() => addNewNote());
