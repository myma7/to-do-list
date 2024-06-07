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
        createElementLiForList.innerHTML = ` ${elements[i]} <button class="btn-click-s" onclick="removeElement(this)">-</button> <button  class="btn-click-s" onclick="doneElement(this)">+</button>`;
        listElements.appendChild(createElementLiForList);
    }
}

function addItemToList() {
    let newItem = searchbar.value.trim();
    if (newItem) {
        listForAllElementsInLists.push(newItem);

        let createElementLiForList = document.createElement("li");
        createElementLiForList.className = "single-element";
        createElementLiForList.innerHTML = `${newItem} <button  class="btn-click-s" onclick="removeElement(this)">-</button> <button  class="btn-click-s" onclick="doneElement(this)">+</button>`;
        listElements.appendChild(createElementLiForList);

        searchbar.value = "";
    }
    console.log(listForAllElementsInLists);
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

// Initialize the list with random elements on page load
addRandomElements();




// function search() {
//     let filter = document.getElementById("searchbar").value.toUpperCase();
//     let ul = document.getElementById("list");
//     let li = ul.getElementsByTagName("li");

//     for (let i = 0; i < li.length; i++) {
//         let txtValue = li[i].textContent || li[i].innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }

// function getDate1() {
//     var date = new Date();
//     var day = date.getDate(); // Corrected method call
//     var hour = date.getHours(); // Corrected method call
//     var minutes = date.getMinutes(); // Corrected method call
//     info.innerHTML = `Date: ${day}, Time: ${hour}:${minutes < 10 ? '0' : ''}${minutes}`; // Improved formatting
// }