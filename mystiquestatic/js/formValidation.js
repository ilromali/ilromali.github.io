const form = document.querySelector('form');
const userName = document.querySelector('#user_name');
const userEmail = document.querySelector('#user_email');
const accessCode = document.querySelector('#access_code');
const userMessage = document.querySelector('#user_message');
form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    var messages = document.querySelectorAll(".requiredMessage");
    messages.forEach(function(item) {
        item.innerHTML = "";
    });

    var fields = document.querySelectorAll(".requiredField");
    fields.forEach(function(item) {
        item.classList.remove("requiredField");
    });

    if (!userName.value || !userEmail.value || !accessCode.value || !userMessage.value) {
        if (!userName.value) {
            userName.parentElement.querySelector('.requiredMessage').innerHTML = "required";
            userName.classList.add("requiredField");
        }
        if (!userEmail.value) {
            userEmail.parentElement.querySelector('.requiredMessage').innerHTML = "required";
            userEmail.classList.add("requiredField");
        }
        if (!accessCode.value) {
            accessCode.parentElement.querySelector('.requiredMessage').innerHTML = "required";
            accessCode.classList.add("requiredField");
        }
        if (!userMessage.value) {
            userMessage.parentElement.querySelector('.requiredMessage').innerHTML = "required";
            userMessage.classList.add("requiredField");
        }
        return;
    }

    form.submit();
});