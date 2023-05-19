// Global Variables
const editMenu = document.getElementById('edit-wrapper');
const bookmarks = document.getElementById('bookmarks');

function addMoreActions(item) {
    var parent = item.parentElement
    var optionsMenu = parent.getElementsByClassName('options')[0]
    var popupMenu = parent.getElementsByClassName('popup-wrapper')[0];

    popupMenu.classList.add('active')
    optionsMenu.classList.toggle('active')

    if (!e) var e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
}

// -----------------------------
// Edit shortcut popups and functions
// -----------------------------
function hidePopup(item) {
    var parent = item.parentElement
    var optionsMenu = parent.getElementsByClassName('options')[0];
    var popupMenu = parent.getElementsByClassName('popup-wrapper')[0];

    popupMenu.classList.remove('active')
    optionsMenu.classList.remove('active');   
}

function hideEditPopup() {
    var editShortcutItem = document.getElementsByClassName('edit-shortcut')[0];
    editShortcutItem.parentElement.parentElement.removeChild(parent.lastChild);
    editMenu.classList.remove('active');
}

function openEditMenu(item) {
    // Item elements for new div
    var parent = item.parentElement.parentElement;
    var currentItem = parent.getElementsByClassName('item')[0];
    var link = currentItem.href;
    var title = currentItem.title;

    // New div creation
    var selectedItem = document.createElement('div');
    selectedItem.classList.add('edit-shortcut');
    var itemContent = `
    <p class="edit-title">Edit shortcut</p>
    <p class="edit-name">Name</p>
    <input class="input-name" type="text" value="${title}">
    <p class="edit-url">URL</p>
    <input class="input-url" type="text" value="${link}">
    <div class="edit-shortcut-buttons">
        <button class="edit-button edit-cancel-button" onclick="closeEditMenu(this)">Cancel</button>
        <button class="edit-button edit-done-button" onclick="changeItem(this)">Done</button>
    </div>`

    selectedItem.innerHTML = itemContent;
    parent.append(selectedItem);

    // Hide the previous edit-shortcuts popup
    hidePopup(parent);

    // Display the edit-wrapper box
    editMenu.classList.add('active');
}

function changeItem(item) {
    // Obtain new name and URL
    var editShortcutBox = item.parentElement.parentElement;
    var name = editShortcutBox.getElementsByClassName('input-name')[0].value;
    var url = editShortcutBox.getElementsByClassName('input-url')[0].value;

    // variables for content to be changed
    // currentItem is 'item-wrapper'
    var itemWrapper = editShortcutBox.parentElement;
    var myItem = itemWrapper.getElementsByClassName('item')[0];
    var title = myItem.getElementsByClassName('title-item')[0];
    var icon = myItem.getElementsByClassName('icon-item')[0];

    var favicon = url + 'favicon.ico';

    // Change contents
    myItem.title = name;
    myItem.href = url;
    title.innerText = name;
    icon.src = favicon;
    
    // close Edit menu
    closeEditMenu(item);
}

function removeItem(item) {
    var itemCount;
    // close Edit menu
    closeEditMenu(item);

    bookmarks.removeChild(bookmarks.lastElementChild);
    itemCount = bookmarks.childElementCount;

    addNewTab(itemCount);
    item.parentElement.parentElement.remove();
}

function closeEditMenu(item) {
    var parent = item.parentElement.parentElement;

    editMenu.classList.remove('active');
    parent.remove();
}


// -----------------------------
// New Item popups and functions
// -----------------------------
function addNewTab(itemCount) {
    console.log(itemCount);
    if (itemCount < 10) {
        var newItem = document.createElement('div');
        newItem.classList.add('item-wrapper');
        var itemContent = `
        <a class="item" title="Add shortcut" onclick="openNewItemMenu(this)"> 
        <div class="item-icon">
            <img class="icon-item" src="images/plus-icon.png" alt="">
        </div>
        <div class="item-title">
            <p class="title-item">Add shortcut</p>
        </div>
        </a>`
    
        newItem.innerHTML = itemContent;
        bookmarks.append(newItem);
    }
    else if (itemCount >= 10) {
        console.log('hello there')
    }
}

function openNewItemMenu(item) {
    var parent = item.parentElement;
    var selectedItem = document.createElement('div');
    selectedItem.classList.add('edit-shortcut');
    var itemContent = `
    <p class="edit-title">Add shortcut</p>
    <p class="edit-name">Name</p>
    <input class="input-name" type="text">
    <p class="edit-url">URL</p>
    <input class="input-url" type="text">
    <div class="edit-shortcut-buttons">
        <button class="edit-button edit-cancel-button" onclick="closeNewItemMenu(this)">Cancel</button>
        <button class="edit-button edit-done-button" onclick="addItem(this)">Done</button>
    </div>`

    selectedItem.innerHTML = itemContent;
    parent.append(selectedItem);

    // Display the edit-wrapper box
    editMenu.classList.add('active');
}

function addItem(item) {
    var parent = item.parentElement.parentElement;
    var name = parent.getElementsByClassName('input-name')[0].value;
    var url = parent.getElementsByClassName('input-url')[0].value;
    var itemCount;

    var selectedItem = document.createElement('div');
    selectedItem.classList.add('item-wrapper');
    var itemContent = `
    <a class="item" title="${name}" href="${url}"> 
        <div class="item-icon">
            <img class="icon-item" src="${url}favicon.ico" alt="">
        </div>
        <div class="item-title">
            <p class="title-item">${name}</p>
        </div>
    </a>
    <div class="more-actions" title="More actions" onclick="addMoreActions(this)">
        <img src="images/three-dots.png" alt="">
    </div>
    <div class="options">
        <p onclick="openEditMenu(this)">Edit shortcut</p>
        <p onclick="removeItem(this)">Remove</p>
    </div>
    <div class="popup-wrapper" onclick="hidePopup(this)"></div>`

    selectedItem.innerHTML = itemContent;

    // console.log(bookmarks.lastElementChild);
    bookmarks.removeChild(bookmarks.lastElementChild);
    bookmarks.append(selectedItem);
    itemCount = bookmarks.childElementCount;

    addNewTab(itemCount);
    closeNewItemMenu(item);
}

function closeNewItemMenu(item) {
    var parent = item.parentElement.parentElement;

    editMenu.classList.remove('active');
    parent.remove();
}

