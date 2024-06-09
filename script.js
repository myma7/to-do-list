document.addEventListener("DOMContentLoaded", function() {
    const info = document.querySelector(".js-info");
    const listElements = document.querySelector(".js-list");
    const searchBar = document.querySelector(".js-searchbar");
    const searchBtn = document.querySelector(".js-search-btn");
    const addBtn = document.querySelector(".js-add-btn");
    const form = document.querySelector(".js-form");

    let listForAllElementsInLists = [];

    function addRandomElements() {
        const elements = ["Tidy up the clothes", "Take out the trash", "Wash the dishes", "Spread the laundry"];
        listForAllElementsInLists.push(...elements);

        for (let i = 0; i < elements.length; i++) {
            let createElementLiForList = document.createElement("li");
            createElementLiForList.className = "single-element";
            createElementLiForList.innerHTML = ` ${elements[i]}  
            <button class="btn-click-simple js-done-btn">✅</button> 
            <button class="btn-click-simple js-edit-btn">✏️</button>
            <button class="btn-click-simple js-remove-btn">❌</button>`;
            listElements.appendChild(createElementLiForList);
        }
        emptylist();
    }

    function addItemToList() {
        let newItem = searchBar.value.trim();
        if (newItem) {
            listForAllElementsInLists.push(newItem);

            let createElementLiForList = document.createElement("li");
            createElementLiForList.className = "single-element";
            createElementLiForList.innerHTML = `${newItem} 
            <button class="btn-click-simple js-done-btn">✅</button>
            <button class="btn-click-simple js-edit-btn">✏️</button>
            <button class="btn-click-simple js-remove-btn">❌</button>`;
            listElements.appendChild(createElementLiForList);

            searchBar.value = "";
            searchBar.focus();
        }
        emptylist();
    }

    function doneElement(button) {
        let listItem = button.parentElement;
        listItem.style.textDecoration = "line-through";

        if (!listItem.querySelector('.js-undo-btn')) {
            let undoButton = document.createElement("button");
            undoButton.textContent = "↩️";
            undoButton.className = 'btn-click js-undo-btn';

            undoButton.addEventListener("click", function() {
                listItem.style.textDecoration = "none";
                listItem.removeChild(undoButton);
            });

            listItem.appendChild(undoButton);
        }
    }

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("js-done-btn")) {
            doneElement(event.target);
        }
    });

    function removeElement(button) {
        let listItem = button.parentElement;
        listItem.remove();
        listForAllElementsInLists = listForAllElementsInLists.filter(item => item !== listItem.innerText.replace(/✅|✏️|❌/g, '').trim());
        emptylist();
    }

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("js-remove-btn")) {
            removeElement(event.target);
        }
    });

    function editElement(listItem) {
        let doneButton = listItem.querySelector('.js-done-btn');
        let removeButton = listItem.querySelector('.js-remove-btn');
        doneButton.style.display = 'none';
        removeButton.style.display = 'none';
    
        let existingUndoButton = listItem.querySelector('.js-undo-btn');
        if (existingUndoButton) {
            listItem.removeChild(existingUndoButton);
        }
    
        let currentText = listItem.innerText.replace(/✅|✏️|❌|↩️/g, '').trim();
    
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
    
        listItem.innerHTML = '';
        listItem.appendChild(input);
    
        let saveButton = document.createElement('button');
        saveButton.innerText = 'save';
        saveButton.className = 'btn-click js-save-btn';
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
        listItem.appendChild(doneButton);
        listItem.appendChild(removeButton);

        doneButton.style.display = 'inline';
        removeButton.style.display = 'inline';

        let editButton = document.createElement('button');
        editButton.innerText = '✏️';
        editButton.className = 'btn-click-simple js-edit-btn';
        editButton.addEventListener("click", function() {
            editElement(listItem);
        });
        listItem.appendChild(doneButton);
        listItem.appendChild(editButton);
        listItem.appendChild(removeButton);
    }

    function numberOfesponsibilities() {
        console.log( "duties: " + listForAllElementsInLists.length);
    }

    function emptylist() {
        if (listForAllElementsInLists.length === 0) {
            info.innerHTML = 'Your to-do list is empty!';
            info.style.display = "flex";
            info.style.justifyContent = "center";
            info.style.color = "red";
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

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addItemToList();
    });

    addBtn.addEventListener("click", addItemToList);
    searchBtn.addEventListener("click", searchForItem);
    searchBar.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            addItemToList(); 
        }
    });
    searchBar.addEventListener("keyup", searchForItem);

    listElements.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains("js-done-btn")) {
            doneElement(target);
        } else if (target.classList.contains("js-remove-btn")) {
            removeElement(target);
        } else if (target.classList.contains("js-edit-btn")) {
            const listItem = target.parentElement;
            editElement(listItem);
        }
    });

    addRandomElements();
    emptylist();

    numberOfesponsibilities();
});
