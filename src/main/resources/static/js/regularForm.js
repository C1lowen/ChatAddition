
function toggleButton(buttonId) {

    let buttons = document.querySelectorAll('.toggle-btn');
    let clickedButton = document.getElementById(buttonId);

    buttons.forEach(function (button) { if (button !== clickedButton) button.classList.remove('active') });

    if (clickedButton.classList.contains('active')) clickedButton.classList.remove('active');
    else clickedButton.classList.add('active');

}

function toggleButtonUserGender(buttonId) {
    let buttons = document.querySelectorAll(".orientation-block button");
    let currentButton = document.getElementById(buttonId);
    for (let b of buttons) {
        b.classList.remove('active');
    }
    currentButton.classList.add('active');
}

function toggleButtonUserAge(buttonId) {
    let buttons = document.querySelectorAll(".my-age-block button");
    let currentButton = document.getElementById(buttonId);
    for (let b of buttons) { 
        b.classList.remove('active');
    }
    currentButton.classList.add('active');
}

