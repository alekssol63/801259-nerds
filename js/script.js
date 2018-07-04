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
var interactiveMap =  document.querySelector("iframe");
interactiveMap.classList.add('active');
/*
interactiveMap.addEventListener('mouseover',()=>{
  interactiveMap.classList.add('active')});
interactiveMap.addEventListener('mouseout',()=>{
  interactiveMap.classList.remove('active')})
*/
function saveData() {
  if (isStorageSupport) {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("eMail", eMail.value);
    localStorage.setItem("letter", letter.value);
  }
}
try {
  storageUserName = localStorage.getItem("userName");
  storageEmail = localStorage.getItem("eMail");
  storageLetter = localStorage.getItem("letter");
} catch (err) {
  isStorageSupport = false;
}

writeButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  messageForm.classList.add("active");
  if (storageUserName) {
    userName.value = storageUserName;
    if (storageEmail) {
      eMail.value = storageEmail;
      if (storageLetter) {
        letter.value = storageLetter;
      } else {
          letter.focus();
      }
    } else {
        eMail.focus();
    }
  } else {
    userName.focus();
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
    if (!userName.value) {
      userName.setAttribute('required', '');
    }
    if (!eMail.value) {
      eMail.setAttribute('required', '');
    }
    if (!letter.value) {
      letter.setAttribute('required', '');
    }
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
