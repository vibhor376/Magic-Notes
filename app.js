// Project NotesApp
showNotes();
//Function to add notes
let flag = false;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    // console.log(addTxt.value);
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");
    // console.log(notes);
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
    // console.log(titleObj);
    if (addTitle.value != "" && addTxt.value != "") {
        notesObj.push(addTxt.value);
        titleObj.push(addTitle.value);
        // console.log(addTitle.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        localStorage.setItem('title', JSON.stringify(titleObj));
        addTxt.value = "";
        addTitle.value = "";
        // console.log(notesObj);
        showNotes();
    } else {
        if (addTxt.value == "") {
            window.alert('Please add a note.');
        } else {
            window.alert('Please add a title');
        }
    }
});
//Function to show added notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem("title");
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
    let html = "";
    // console.log(titleObj);
    for (let i = 0; i < notesObj.length; i++) {
        html += `
    <div class="card cardNote mx-2 my-2 " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title"> ${titleObj[i]}</h5>
          <p class="card-text"> ${notesObj[i]} </p>
          <div class="mb-0">
          <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary" style="color:#ffff;" >Delete Note</button>
          <a id="${i}" onclick="markAsImportant(this.id)"  class="impBtn btn btn-danger" style="color:#ffff;" >Important</a>
          </div>
        </div>
    </div>`;
    };
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `<p>Nothing to show! Use <b>Add a Note</b> section above to <b>add</b> notes.</p>
        <p> Once note is <b>added</b>, click on <b>important</b> to mark note as important and <b>double</b> click on important to mark note as <b>not</b> important.</p>`;
    }
}
// ondblclick="notImportant(this.id)"
//Function to delete note

function deleteNote(index) {
    // console.log('I am deleting this note', index);
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    // let title= localStorage.getItem('title');
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    } else {
        notesObj = JSON.parse(notes);
        titleObj = JSON.parse(title);
    }
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    localStorage.setItem('title', JSON.stringify(titleObj));
    showNotes();
}

// Function to search notes

let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function (e) {
    let val = searchText.value.toLowerCase();
    //  console.log('fire',val);
    let cardNote = document.getElementsByClassName('cardNote');
    // console.log(cardNote);
    Array.from(cardNote).forEach(function (element) {
        let elementText = element.getElementsByTagName("p")[0].innerText;
        let titleText = element.getElementsByTagName("h5")[0].innerText;
        titleText = titleText.toLowerCase();
        elementText = elementText.toLowerCase();
        // console.log(elementText);
        if (elementText.includes(val) || titleText.includes(val)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        // console.log(element);   
    })
})

// Function to mark important

function markAsImportant(index) {
    let cardNote = document.getElementsByClassName('cardNote');
    // console.log(cardNote);
    let count = 0;
    let elm=document.getElementsByTagName('cardnote.a');
    // console.log(elm);
    Array.from(cardNote).forEach(function (element) {
        if (count == index && !flag) {
            // console.log(element);
            element.style.backgroundColor = "#343a40";
            element.style.color = "#ffff";
            flag=true;
        } else {
            if (count == index && flag) {
                element.style.backgroundColor = "#ffff";
                element.style.color = "#343a40";
                flag=false;
            }
        }
        count++;
        // console.log(element);   
    })
}

// Function to remove important mark

// function notImportant(index) {
//     let cardNote = document.getElementsByClassName('cardNote');
//     // console.log(cardNote);
//     let count = 0;
//     Array.from(cardNote).forEach(function (element) {
//         if (count == index) {
//             console.log(element);
//             element.style.backgroundColor = "#ffff";
//             element.style.color = "#343a40";
//         }
//         count++;
//         // console.log(element);   
//     })
// }

// Features to Add
// 1) Add title (Done)
// 2) Mark Important (Done)
// 3) User wise notes 
// 4) Host website 