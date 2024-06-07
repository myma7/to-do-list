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
        createElementLiForList.innerHTML = ` ${elements[i]} <button class="btn-click-simple" onclick="removeElement(this)">❌</button> <button  class="btn-click-simple" onclick="doneElement(this)">✅</button>`;
        listElements.appendChild(createElementLiForList);
    }
}

function addItemToList() {
    let newItem = searchbar.value.trim();
    if (newItem) {
        listForAllElementsInLists.push(newItem);

        let createElementLiForList = document.createElement("li");
        createElementLiForList.className = "single-element";
        createElementLiForList.innerHTML = `${newItem} <button  class="btn-click-simple" onclick="removeElement(this)">❌</button> <button  class="btn-click-simple" onclick="doneElement(this)">✅</button>`;
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
