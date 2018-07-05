var writeButton = document.querySelector(".write-us");

var messageForm = document.querySelector(".message-form");

var close = messageForm.querySelector(".modal-close");

var userName = messageForm.querySelector("[name=user-name]");
var eMail = messageForm.querySelector("[name=e-mail]");
var letter = messageForm.querySelector("[name=letter]");
var isStorageSupport = true;

var storageUserName = "";
var storageEmail  = "";
var storageLetter = "";

function saveData() {
  if (isStorageSupport) {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("eMail", eMail.value);
    localStorage.setItem("letter", letter.value);
  }
}
try {
  storageUserName = localStorage.getItem("userName");
  if (userName.hasAttribute('required')) {
    userName.removeAttribute('required')
  }
  storageEmail = localStorage.getItem("eMail");
  if (eMail.hasAttribute('required')) {
    eMail.removeAttribute('required')
  }
  storageLetter = localStorage.getItem("letter");
} catch (err) {
  isStorageSupport = false;
}

writeButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  messageForm.classList.add("active");
  if (storageUserName) {
    userName.value = storageUserName;
    eMail.focus();
  } else {
    userName.focus();
  }

  if (storageEmail) {
    eMail.value = storageEmail;
    letter.focus();
  } else {
    eMail.focus();
  }

  if (storageLetter) {
    letter.value = storageLetter;
  }

});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  messageForm.classList.remove("active");
  messageForm.classList.remove("modal-error");
  saveData();
});

messageForm.addEventListener("submit", function (evt) {
  if (!userName.value || !eMail.value || !letter.value) {
    evt.preventDefault();
    messageForm.classList.remove("modal-error");
    messageForm.offsetWidth = messageForm.offsetWidth;
    messageForm.classList.add("modal-error");
  } else {
    saveData();
  }
});
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (messageForm.classList.contains("active")) {
      messageForm.classList.remove("active");
      messageForm.classList.remove("modal-error");
    }
    saveData();
  }
 });
