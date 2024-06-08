var info = document.querySelector(".info");
var listElements = document.querySelector("#list");
var searchbar = document.querySelector("#searchbar");

var listForAllElementsInLists = [];

function addRandomElements() {
    var elements = ["Tidy up the clothes", "Take out the trash", "Wash the dishes", "Spread the laundry"];
    listForAllElementsInLists.push(...elements);

    for (let i = 0; i < elements.length; i++) {
        let createElementLiForList = document.createElement("li");
        createElementLiForList.className = "single-element";
        createElementLiForList.innerHTML = ` ${elements[i]} <button class="btn-click-simple" onclick="removeElement(this)">❌</button> 
        <button  class="btn-click-simple" onclick="doneElement(this)">✅</button> <button  class="btn-click-simple" onclick="editElement(this)">✏️</button>`;
        listElements.appendChild(createElementLiForList);
    }
}

function addItemToList() {
    let newItem = searchbar.value.trim();
    if (newItem) {
        listForAllElementsInLists.push(newItem);

        let createElementLiForList = document.createElement("li");
        createElementLiForList.className = "single-element";
        createElementLiForList.innerHTML = `${newItem} <button  class="btn-click-simple" onclick="removeElement(this)">❌</button> 
        <button  class="btn-click-simple" onclick="doneElement(this)">✅</button> <button  class="btn-click-simple" onclick="editElement(this)">✏️</button>`;
        listElements.appendChild(createElementLiForList);

        searchbar.value = "";
    }
}

function doneElement(button) {
    let listItem = button.parentElement;
    listItem.style.textDecoration = "line-through";
}

function removeElement(button) {
    let listItem = button.parentElement;
    listItem.remove();
}

function editElement(button) {
    let listItem = button.parentElement;

    let doneButton = listItem.querySelector('button[onclick="doneElement(this)"]');
    let removeButton = listItem.querySelector('button[onclick="removeElement(this)"]');
    doneButton.style.display = 'none';
    removeButton.style.display = 'none';


    let currentText = listItem.innerText.replace(/❌|✅|✏️/g, '').trim();

    let input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;

    listItem.innerHTML = '';
    listItem.appendChild(input);

    let saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.className = 'btn-click ';
    saveButton.onclick = function() {
        saveEdit(listItem, input, doneButton, removeButton);
    };
    listItem.appendChild(saveButton);

    console.log('Editing');
}

function saveEdit(listItem, input, doneButton, removeButton) {
    let newValue = input.value;

    listItem.innerHTML = `${newValue} `;

    listItem.appendChild(removeButton);
    listItem.appendChild(doneButton);
    doneButton.style.display = 'inline';
    removeButton.style.display = 'inline';

    let editButton = document.createElement('button');
    editButton.innerText = '✏️';
    editButton.className = 'btn-click-simple';
    editButton.onclick = function() {
        editElement(editButton);
    };
    listItem.appendChild(editButton);

    console.log('Saved:', newValue);
}

function searchForItem() {
    let filter = searchbar.value.toUpperCase();
    let li = listElements.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        let txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

addRandomElements();
