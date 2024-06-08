document.addEventListener("DOMContentLoaded", function() {
    const info = document.querySelector(".info");
    const listElements = document.querySelector("#list");
    const searchBar = document.querySelector("#searchbar");
    const searchBtn = document.querySelector("#search-btn");
    const addBtn = document.querySelector("#add-btn");

    let listForAllElementsInLists = [];

    function addRandomElements() {
        const elements = ["Tidy up the clothes", "Take out the trash", "Wash the dishes", "Spread the laundry"];
        listForAllElementsInLists.push(...elements);

        for (let i = 0; i < elements.length; i++) {
            let createElementLiForList = document.createElement("li");
            createElementLiForList.className = "single-element";
            createElementLiForList.innerHTML = ` ${elements[i]}  
            <button class="btn-click-simple done-btn">✅</button> <button class="btn-click-simple edit-btn">✏️</button> <button class="btn-click-simple remove-btn">❌</button>`;
            listElements.appendChild(createElementLiForList);
        }
    }

    function addItemToList() {
        let newItem = searchBar.value.trim();
        if (newItem) {
            listForAllElementsInLists.push(newItem);

            let createElementLiForList = document.createElement("li");
            createElementLiForList.className = "single-element";
            createElementLiForList.innerHTML = `${newItem} 
            <button  class="btn-click-simple done-btn">✅</button> <button  class="btn-click-simple edit-btn">✏️</button> <button  class="btn-click-simple remove-btn">❌</button> `;
            listElements.appendChild(createElementLiForList);

            searchBar.value = "";
            searchBar.focus();
        }
        emptylist();
    }

    function doneElement(button) {
        let listItem = button.parentElement;
        listItem.style.textDecoration = "line-through";

        let undoButton = document.createElement("button");
        undoButton.textContent = "↩️";
        undoButton.className = 'btn-click';

        undoButton.addEventListener("click", function() {
            listItem.style.textDecoration = "none";
            listItem.removeChild(undoButton);
        });

        listItem.appendChild(undoButton);
    }

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("done-btn")) {
            doneElement(event.target);
        }
    });

    function removeElement(button) {
        let listItem = button.parentElement;
        listItem.remove();
        listForAllElementsInLists = listForAllElementsInLists.filter(item => item !== listItem.innerText.replace(/❌|✅|✏️/g, '').trim());
        emptylist(); 
    }

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-btn")) {
            removeElement(event.target);
        }
    });

    function editElement(listItem) {
        let doneButton = listItem.querySelector('.done-btn');
        let removeButton = listItem.querySelector('.remove-btn');
        doneButton.style.display = 'none';
        removeButton.style.display = 'none';

        let currentText = listItem.innerText.replace(/❌|✅|✏️/g, '').trim();

        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;

        listItem.innerHTML = '';
        listItem.appendChild(input);

        let saveButton = document.createElement('button');
        saveButton.innerText = 'save';
        saveButton.className = 'btn-click';
        saveButton.addEventListener("click", function() {
            saveEdit(listItem, input, doneButton, removeButton);
        });
        listItem.appendChild(saveButton);
    }

    function saveEdit(listItem, input, doneButton, removeButton) {
        let newValue = input.value;

        let newText = document.createTextNode(newValue);
        listItem.innerHTML = '';
        listItem.appendChild(newText);

        listItem.appendChild(removeButton);
        listItem.appendChild(doneButton);
        doneButton.style.display = 'inline';
        removeButton.style.display = 'inline';

        let editButton = document.createElement('button');
        editButton.innerText = '✏️';
        editButton.className = 'btn-click-simple edit-btn';
        editButton.addEventListener("click", function() {
            editElement(listItem);
        });
        listItem.appendChild(editButton);
    }

    function emptylist() {
        if(listForAllElementsInLists.length === 0 ){
            info.innerHTML = 'Your to-do list is empty!';
            info.style.display="flex";
            info.style.justifyContent="center";
            info.style.color ="red";
        } else {
            info.innerHTML = '';
        }
    }

    function searchForItem() {
        let filter = searchBar.value.toUpperCase();
        let li = listElements.getElementsByTagName("li");

        for (let i = 0; i < li.length; i++) {
            let txtValue = li[i].textContent || li[i].innerText;
            li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }

    addBtn.addEventListener("click", addItemToList);
    searchBtn.addEventListener("click", searchForItem);
    searchBar.addEventListener("keyup", searchForItem);

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("edit-btn")) {
            let listItem = event.target.parentElement;
            editElement(listItem);
        }
    });

    addRandomElements();
    emptylist();
});
