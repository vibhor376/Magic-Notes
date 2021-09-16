// Project NotesApp
showNotes();
//Function to add notes
let flag = false;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');//get hold of element having id as 'addTxt'
    let addTitle = document.getElementById('addTitle');//get hold of element having id as 'addTitle'
    let notes = localStorage.getItem("notes");//get 'notes' from local storage
    // console.log(notes);
    if (notes == null) {//intially null
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);//parse JSON string to object so that it can be stored in array
    }
    let myObj = {//make an object having two values
        notes: addTxt.value,
        title: addTitle.value
    }
    if (addTitle.value != "" && addTxt.value != "") {
        notesObj.push(myObj);//make an array of objects
        // console.log(notesObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));//converting notesObj into string
        addTxt.value = "";//clear the notes section
        addTitle.value = "";//clear the title section
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
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";// initialize a empty string
    for (let i = 0; i < notesObj.length; i++) {
        html += `
    <div class="card cardNote mx-2 my-2 " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${i+1}. ${notesObj[i].title}</h5>
          <p class="card-text"> ${notesObj[i].notes} </p>
          <div class="mb-0">
          <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary" style="color:#ffff;" >Delete Note</button>
          <a id="${i}" onclick="markAsImportant(this.id)"  class="impBtn btn btn-danger" style="color:#ffff;" >Important</a>
          </div>
        </div>
    </div>`;//concatenates all the items in array i.e to show the divs on screen 
    };
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;// to show the div elements on screen
    } else {
        notesElem.innerHTML = `<p>Nothing to show! Use Add a note section above to add notes.</p>
        <p> Once note is added, click on important to mark note as important and then click again on important to mark note as not important.</p>`;
    }
}
//Function to delete note

function deleteNote(index) {
    // console.log('I am deleting this note', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);// splice function used to delete elements from a particular index i.e in a range of (l,r)
    localStorage.setItem('notes', JSON.stringify(notesObj));// update the local storage
    showNotes();// call again 
}

// Function to search notes

let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function (e) {
    let val = searchText.value.toLowerCase();// converts value of text to be searched into lower case
    //  console.log('fire',val);
    let cardNote = document.getElementsByClassName('cardNote');//get hold of element by class name
    // console.log(cardNote);
    Array.from(cardNote).forEach(function (element) {
        let elementText = element.getElementsByTagName("p")[0].innerText;// p tag in which you have to search
        let titleText = element.getElementsByTagName("h5")[0].innerText;// h5 tag in which you have to search
        titleText = titleText.toLowerCase();// lowercase conversion
        elementText = elementText.toLowerCase();// lowercase conversion
        // console.log(elementText);
        if (elementText.includes(val) || titleText.includes(val)) {
            element.style.display = "block";//display property changed to block
        } else {
            element.style.display = "none";// used to hide other div elements on page when search condition does not match
        }
        // console.log(element);   
    })
})

// Function to mark important

function markAsImportant(index) {
    let cardNote = document.getElementsByClassName('cardNote');
    // console.log(cardNote);
    let count = 0;// intialize count 
    let elm=document.getElementsByTagName('cardnote.a');
    // console.log(elm);
    Array.from(cardNote).forEach(function (element) {
        if (count == index && !flag) {// if count matches the intialize bool value to true
            // console.log(element);
            element.style.backgroundColor = "#343a40";
            element.style.color = "#ffff";
            flag=true;// true bool value indicates that div is marked important
        } else {
            if (count == index && flag) {
                element.style.backgroundColor = "#ffff";
                element.style.color = "#343a40";
                flag=false;//revert the changes done above make bool value false so that important mark can be removed from element
            }
        }
        count++;
        // console.log(element);   
    })
}

// Function to remove important mark
// Just another implementation ignore it
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
