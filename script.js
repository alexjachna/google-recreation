// Global Variables
const editMenu = document.getElementById('edit-wrapper');
const bookmarks = document.getElementById('bookmarks');
const otherApps = document.getElementById('nine-dots');
const gmailAccounts = document.getElementById('google-account');
const popups = [otherApps, gmailAccounts];
const imageArray = ["images/account-images/landscape-1.jpg", "images/account-images/landscape-2.jpg", "images/account-images/landscape-3.jpg", "images/account-images/landscape-4.jpg", "images/account-images/landscape-5.jpg"]

function preventWindowClose() {
    if (!e) var e = window.event
    e.cancelBubble = true
    if (e.stopPropagation) e.stopPropagation()
}

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
    
    hidePopup(editShortcutBox);
    // close Edit menu
    closeEditMenu(item);
}

function removeItem(item) {
    var itemCount = bookmarks.childElementCount;
    var lastItem = bookmarks.lastElementChild.id;

    if (lastItem == 'new-item') {
        closeEditMenu(item);
    }
    else {
        item.parentElement.parentElement.remove();
        itemCount = bookmarks.childElementCount;
        addNewTab(itemCount);
    }
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
    console.log("added new tab: " + itemCount);
    if (itemCount < 10) {
        var newItem = document.createElement('div');
        newItem.setAttribute("id", "new-item")
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
    selectedItem.setAttribute("id", "bookmark");
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

// Other functions //

// Event Listener for closing popups
window.addEventListener('click', ({ target }) => {
    const popup = target.closest('.popup');
    const clickedOnClosedPopup = popup && !popup.classList.contains('active');
    
    popups.forEach(p => p.classList.remove('active'));
    
    if (clickedOnClosedPopup) {
        if (localStorage.getItem('myEmail') !== null) {
            insertAccount();
            localStorage.removeItem('myEmail');
            localStorage.removeItem('myName');
        }
        else {
            console.log('storage is empty.')
        }
        // otherApps.style.pointerEvents = "none";
        // gmailAccounts.style.pointerEvents = "none";
        popup.classList.add('active');  
    }
  });

function addAccount() {
    let accounts = document.getElementById('accounts').innerHTML;
    localStorage.setItem('accounts', accounts);

    console.log(accounts);

    if (document.getElementsByClassName('main-account')[0].childElementCount == 0) {
        window.location.replace("./account.html");
    }
    else if (document.getElementsByClassName('alt-accounts-container')[0].childElementCount < 4) {
        window.location.replace("./account.html");
    }
    else {
        alert('too many accounts!');
    }
    
}

function insertAccount() {

    let accounts = document.getElementById('accounts');

    accounts.innerHTML = "";
    accounts.innerHTML = localStorage.getItem('accounts');

    var randomNum = Math.floor(Math.random() * imageArray.length);  
    const email = localStorage.getItem('myEmail');
    const name = localStorage.getItem('myName');
    const randomImage = imageArray[randomNum];

    console.log(accounts.innerHTML);

    let mainAccVal = accounts.getElementsByClassName('main-account')[0].childElementCount;

    console.log(mainAccVal);

    // // If all accounts signed out
    if (mainAccVal == 0) {
        console.log('removed all accounts PLUS MAIN!')

        var mainAcc = document.getElementsByClassName('main-account')[0];

        var itemContent = `<div class="ma-left">
            <div class="account-image">
                <img class="main-img" src=${randomImage} alt="">
                <div class="change-account-image">
                    <img src="images/camera.png" alt="">
                </div>
            </div>  
        </div>
        <div class="ma-right">
            <div class="email-info">
                <p class="main-name">${name}</p>
                <p class="main-email">${email}</p>
            </div>
            <a href="https://www.google.com/account/about/">
                <div class="manage-account">
                    <p>Manage your Google Account</p>
                </div>
            </a> 
        </div>`

        mainAcc.innerHTML = itemContent;
    }

    else {
        console.log('didnt sign out all accounts!');

        var altsContainer = document.getElementsByClassName('alt-accounts-container')[0];
        var newAccount = document.createElement('div');
        newAccount.classList.add('alt-account');
        newAccount.setAttribute("onclick", "switchAccount(this)");
        var itemContent = `
        <div class="alt-image" onclick="switchAccount(this)">
            <img class="alt-img" src=${randomImage} alt="">
        </div>
        <div class="email-info">
            <p class="alt-name">${name}</p>
            <p class="alt-email">${email}</p>
        </div>`

        newAccount.innerHTML = itemContent;
        altsContainer.append(newAccount);
    }
}

function switchAccount(item) {
    // 1. Get current main account name, email, pic
    let mainAccount = document.getElementsByClassName('main-account')[0];
    let mainName = mainAccount.getElementsByClassName('main-name')[0].innerText;
    let mainEmail = mainAccount.getElementsByClassName('main-email')[0].innerText;
    let mainImage = mainAccount.getElementsByClassName('main-img')[0].src;

    console.log(mainName, mainEmail, mainImage);

    // 2. Get items name, email, pic
    let itemName = item.getElementsByClassName('alt-name')[0].innerText;
    let itemEmail = item.getElementsByClassName('alt-email')[0].innerText;
    let itemImage = item.getElementsByClassName('alt-img')[0].src;

    console.log(itemName, itemEmail, itemImage);

    // 3. Replace main-accounts content with selectedItem
    mainAccount.getElementsByClassName('main-name')[0].innerText = itemName;
    mainAccount.getElementsByClassName('main-email')[0].innerText = itemEmail;
    mainAccount.getElementsByClassName('main-img')[0].src = itemImage;

    // 4. remove selectedItem
    item.remove();

    // 5. Make new account with step1's main account info
    var altsContainer = document.getElementsByClassName('alt-accounts-container')[0];
    var newAccount = document.createElement('div');
    newAccount.classList.add('alt-account');
    newAccount.setAttribute("onclick", "switchAccount(this)");
    var itemContent = `
    <div class="alt-image">
        <img class="alt-img" src=${mainImage} alt="">
    </div>
    <div class="email-info">
        <p class="alt-name">${mainName}</p>
        <p class="alt-email">${mainEmail}</p>
    </div>`

    newAccount.innerHTML = itemContent;
    altsContainer.append(newAccount);

    // 6. Switch .google-account-icon and hover text
    document.getElementsByClassName('google-account-icon')[0].src = itemImage;
    document.getElementsByClassName('hover-name')[0].innerText = itemName;
    document.getElementsByClassName('hover-email')[0].innerText = itemEmail;

    // 7. Hide popup
    gmailAccounts.classList.remove('active');
}

function signOutAll() {
    let accounts = document.getElementById('accounts');
    let noAccounts = document.getElementById('no-accounts');
    let signOut = document.getElementById('sign-out');
    let mainAccount = document.getElementsByClassName('main-account')[0];
    let altAccounts = document.getElementsByClassName('alt-accounts-container')[0];

    accounts.style.display = "none";
    signOut.style.display = "none";
    noAccounts.style.display = "flex";
    
    mainAccount.innerHTML = "";
    altAccounts.innerHTML = "";
}