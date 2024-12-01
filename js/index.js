var nameInput = document.querySelector('#nameInput');
var mainBtn = document.querySelector('#mainBtn');
var tableContent = document.querySelector('#tableContent');
var addIcon = document.querySelector('#addIcon');
var updateIcon = document.querySelector('#updateIcon');
var updated = false;
var list = [];
var nameRegex = /^[a-zA-Z_.-]{3,16}$/

if (localStorage.getItem('items')) {
    list = JSON.parse(localStorage.getItem('items'))
    displayNew()
} else {
    list = [];
}


mainBtn.addEventListener("click", function () {
    if (updated != true) {
        addNew()
    } else {
        updating()
    }
})

document.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        if (updated != true) {
            addNew()
        } else {
            updating()
        }
    }
})

function addNew() {
    if (nameRegex.test(nameInput.value)) {
        list.push(nameInput.value)
        localStorage.setItem('items', JSON.stringify(list))
        displayNew()
        clearItem()

    } else {
        alert('Enter a valid name')
    }

}
nameInput.addEventListener("keydown", function () {
    if (nameRegex.test(nameInput.value)) {
        nameInput.classList.replace("is-invalid", "is-valid")
    } else {
        nameInput.classList.add("is-invalid")

    }
})

function displayNew() {
    var demo = ''
    for (i = 0; i < list.length; i++) {
        demo += ` <div class="testat d-flex bg-secondary bg-opacity-25 rounded p-2 my-1 position-relative overflow-hidden">
                    <h3 class="w-75 ms-1" edit="${i}">${list[i]}</h3>
                    <button class="btn position-absolute top-50 translate-middle-y " onclick="deleteItem(${i})" >
                        <i class="fa-solid fa-trash bg-danger fs-3 p-5 text-white"></i>
                    </button>
                </div>`

    }

    tableContent.innerHTML = demo


}

function deleteItem(index) {
    list.splice(index, 1)
    localStorage.setItem('items', JSON.stringify(list))
    displayNew()
    console.log();

}

function clearItem() {
    nameInput.classList.remove("is-valid");
    nameInput.value = ''

}



var mainIndx;
document.addEventListener('dblclick', function (e) {
    if (e.target.getAttribute("edit")) {
        var currentInd = e.target.getAttribute("edit")
        nameInput.value = list[currentInd]
        addIcon.classList.add("d-none")
        updateIcon.classList.replace("d-none", "d-flex")
        updated = true
    }
    mainIndx = currentInd;
    //or nameInput.value = list[e.target.getAttribute("edit")]

})

function updating() {
    if (nameRegex.test(nameInput.value)) {
        list.splice(mainIndx, 1, nameInput.value)
    displayNew()
    updated = false
    localStorage.setItem('items', JSON.stringify(list))
    clearItem()
    addIcon.classList.replace("d-none","d-flex")
    updateIcon.classList.replace("d-flex", "d-none")
}else{
    alert("Enter a valid name")
}

}


