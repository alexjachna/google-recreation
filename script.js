const moreActions = document.querySelectorAll('.more-actions');
const popupMenu = document.getElementById('popup-wrapper');
const editMenu = document.getElementById('edit-wrapper');

moreActions.forEach(item => {
    item.addEventListener('click', e => {
        var parent = item.parentElement
        var optionsMenu = parent.getElementsByClassName('options')[0]

        popupMenu.classList.add('active')
        optionsMenu.classList.toggle('active')

        if (!e) var e = window.event
        e.cancelBubble = true
        if (e.stopPropagation) e.stopPropagation()
    })
});

function hidePopup() {
    moreActions.forEach(item => {
        var parent = item.parentElement;
        var optionsMenu = parent.getElementsByClassName('options')[0];

        popupMenu.classList.remove('active')
        optionsMenu.classList.remove('active');
    })   
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
    hidePopup();

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

function closeEditMenu(item) {
    var parent = item.parentElement.parentElement.parentElement;

    editMenu.classList.remove('active');
    parent.removeChild(parent.lastChild);
}