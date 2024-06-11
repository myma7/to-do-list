document.addEventListener("DOMContentLoaded", function() {
    const info = document.querySelector(".js-info");
    const listElements = document.querySelector(".js-list");
    const searchBar = document.querySelector(".js-searchbar");
    const searchBtn = document.querySelector(".js-search-btn");
    const addBtn = document.querySelector(".js-add-btn");
    const form = document.querySelector(".js-form");
    const btns = document.querySelector(".btn-search-add");

    let listForAllElementsInLists = [];

    function createListItem(text) {
        let createElementLiForList = document.createElement("li");
        createElementLiForList.className = "single-element";
    
        let textDiv = document.createElement("div");
        let buttonsDiv = document.createElement("div");
    
        textDiv.classList.add("element-div");
        buttonsDiv.classList.add("element-div-2");
    
        textDiv.innerHTML = `${text}`;
        buttonsDiv.innerHTML = `
            <button class="btn-click-simple js-done-btn">✅</button> 
            <button class="btn-click-simple js-edit-btn">✏️</button>
            <button class="btn-click-simple js-remove-btn">❌</button>
        `;
    
        createElementLiForList.appendChild(textDiv);
        createElementLiForList.appendChild(buttonsDiv);
    
        return createElementLiForList;
    }
    
    function addRandomElements() {
        const elements = ["Tidy up the clothes", "Take out the trash", "Wash the dishes", "Spread the laundry"];
        listForAllElementsInLists.push(...elements);
    
        for (let i = 0; i < elements.length; i++) {
            let listItem = createListItem(elements[i]);
            listElements.appendChild(listItem);
        }
    
        emptylist();
        numberOfResponsibilities();
    }
    
    function addItemToList() {
        let newItem = searchBar.value.trim();
        if (newItem) {
            listForAllElementsInLists.push(newItem);
            searchBar.value = "";
    
            let listItem = createListItem(newItem);
            listElements.appendChild(listItem);
        }
    }
    
    
    function doneElement(button) {
        let listItem = button.closest("li");
        let textElement = listItem.querySelector('.element-div');
    
        textElement.style.textDecoration = "line-through";
    
        if (!listItem.querySelector('.js-undo-btn')) {
            let undoButton = document.createElement("button");
            undoButton.textContent = "↩️";
            undoButton.className = 'btn-click js-undo-btn btn-click-simples';
    
            undoButton.addEventListener("click", function() {
                textElement.style.textDecoration = "none";
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
       
        let listItem = button.closest("li");

        listItem.remove();

        let itemText = listItem.querySelector(".element-div").innerText;
        listForAllElementsInLists = listForAllElementsInLists.filter(item => item !== itemText);
    
        emptylist();
        numberOfResponsibilities();
    }

    listElements.addEventListener("click", function(event) {
        if (event.target.classList.contains("js-remove-btn")) {
            removeElement(event.target);
        }
    });

    function editElement(button) {
        let listItem = button.closest("li");
        let textElement = listItem.querySelector('.element-div');
    
        let currentText = textElement.textContent.trim();
    
        let doneButton = listItem.querySelector('.js-done-btn');
        let removeButton = listItem.querySelector('.js-remove-btn');
        doneButton.style.display = 'none';
        removeButton.style.display = 'none';
    
        let input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
    
        listItem.innerHTML = '';
        listItem.appendChild(input);
    
        let saveButton = document.createElement('button');
        saveButton.innerText = 'Save';
        saveButton.className = 'btn-click js-save-btn';
        saveButton.addEventListener("click", function() {
            saveEdit(listItem, input, doneButton, removeButton);
        });
        listItem.appendChild(saveButton);
    }
    
    
    function saveEdit(listItem, input, doneButton, removeButton) {
        let newValue = input.value;
    
        let newTextDiv = document.createElement('div');
        newTextDiv.classList.add('element-div');
        newTextDiv.textContent = newValue;
    
        listItem.innerHTML = '';
        listItem.appendChild(newTextDiv);
       
    
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
    
        let index = Array.from(listElements.children).indexOf(listItem);
        listForAllElementsInLists[index] = newValue;
    }
    
    function numberOfResponsibilities() {
        let existingCountElement = info.querySelector('.js-responsibility-count');
        if (!existingCountElement) {
            existingCountElement = document.createElement('div');
            existingCountElement.className = "js-responsibility-count";
            info.appendChild(existingCountElement);
        }
        if (listForAllElementsInLists.length === 0) {
            existingCountElement.style.display = "none";
        } else {
            existingCountElement.innerHTML = `Duties: ${listForAllElementsInLists.length}`;
        }
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
        numberOfResponsibilities();
    }

    function searchForItem() {
        let filter = searchBar.value.toUpperCase();
        let li = listElements.getElementsByTagName("li");

        for (let i = 0; i < li.length; i++) {
            let txtValue = li[i].textContent || li[i].innerText;
            li[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }


    function sortingElement() {
        let sortButton = document.createElement("button");
        sortButton.textContent = "Sort";
        sortButton.classList.add("sorting", "btn-click");
    
        let sortDirection = "asc";
    
        sortButton.addEventListener("click", function(){
            let lis = Array.from(listElements.querySelectorAll('li'));
            lis.sort(function(a, b) {
                let textA = a.textContent.trim().toUpperCase();
                let textB = b.textContent.trim().toUpperCase();
                if(sortDirection === "asc") {
                    if(textA < textB) return -1;
                    if(textA > textB) return 1;
                    return 0;
                } else {
                    if(textA < textB) return 1;
                    if(textA > textB) return -1;
                    return 0;
                }
            });
            listElements.innerHTML = '';
            lis.forEach(li => listElements.appendChild(li));
    
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        })
    
        btns.append(sortButton);
    }
    sortingElement();

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
});
