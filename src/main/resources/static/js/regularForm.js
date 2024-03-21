window.addEventListener('load', () => {
    checkUserInSearch()
});

function checkUserInSearch() {
    let userId = localStorage.getItem('uniqueId');
    fetch('/user/check/search/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            if(data === 'true') {
                formSearchUser()
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}


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

// function cancelSearch(){
//     let mainContent = document.getElementById('main-content');
//     let load = document.getElementById('loader-container');
//     mainContent.style.opacity = '0'
//     load.style.opacity = '1'
// }

function deleteUserQueueSearch() {
    let userId = localStorage.getItem('uniqueId');
    fetch('/user/delete/queue/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function cancelSearch() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    deleteUserQueueSearch()

    mainContent.innerHTML = '<div id="main-content">\n' +
        '    <div class="form-block">\n' +
        '\n' +
        '        <div class="form-container">\n' +
        '\n' +
        '            <div class="chat-header">\n' +
        '\n' +
        '                <img src="/img/logo.png" alt="logo">\n' +
        '\n' +
        '                <p>\n' +
        '\n' +
        '                    <a class="not-active-tag-a" href="/">Addition</a>\n' +
        '\n' +
        '                </p>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="form-line-first">\n' +
        '\n' +
        '                <div class="orientation-block">\n' +
        '\n' +
        '                    <p>\n' +
        '\n' +
        '                        Моя стать\n' +
        '\n' +
        '                    </p>\n' +
        '\n' +
        '                    <button id="gender-male" onclick="toggleButtonUserGender(\'gender-male\')">\n' +
        '                        <input type="hidden" value="Хлопець">\n' +
        '                        Я хлопець\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="gender-female" onclick="toggleButtonUserGender(\'gender-female\')">\n' +
        '                        <input type="hidden" value="Дівчина">\n' +
        '                        Я дівчина\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                </div>\n' +
        '\n' +
        '\n' +
        '                <div class="looking-age-block">\n' +
        '\n' +
        '                    <p>\n' +
        '\n' +
        '                        Я шукаю\n' +
        '\n' +
        '                    </p>\n' +
        '\n' +
        '                    <button id="looking-male" onclick="toggleButton(\'looking-male\')">\n' +
        '                        <input type="hidden" value="Хлопець">\n' +
        '                        Хлопця\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="looking-female" onclick="toggleButton(\'looking-female\')">\n' +
        '                        <input type="hidden" value="Дівчина">\n' +
        '                        Дівчину\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                </div>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="form-line-second">\n' +
        '\n' +
        '                <div class="my-age-block">\n' +
        '\n' +
        '                    <p>\n' +
        '\n' +
        '                        Мій вік\n' +
        '\n' +
        '                    </p>\n' +
        '\n' +
        '                    <button id="age1" onclick="toggleButtonUserAge(\'age1\')">\n' +
        '\n' +
        '                        16-17\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age2" onclick="toggleButtonUserAge(\'age2\')">\n' +
        '\n' +
        '                        18-21\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age3" onclick="toggleButtonUserAge(\'age3\')">\n' +
        '\n' +
        '                        22-25\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age4" onclick="toggleButtonUserAge(\'age4\')">\n' +
        '\n' +
        '                        26-30\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age5" onclick="toggleButtonUserAge(\'age5\')">\n' +
        '\n' +
        '                        31-35\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age6" onclick="toggleButtonUserAge(\'age6\')">\n' +
        '\n' +
        '                        36..\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                </div>\n' +
        '\n' +
        '                <div class="looking-block">\n' +
        '\n' +
        '                    <p>\n' +
        '                        Вік цікавить\n' +
        '                    </p>\n' +
        '\n' +
        '                    <button id="age7" onclick="toggleButton(\'age7\')">\n' +
        '\n' +
        '                        16-17\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age8" onclick="toggleButton(\'age8\')">\n' +
        '\n' +
        '                        18-21\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age9" onclick="toggleButton(\'age9\')">\n' +
        '\n' +
        '                        22-25\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age10" onclick="toggleButton(\'age10\')">\n' +
        '\n' +
        '                        26-30\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age11" onclick="toggleButton(\'age11\')">\n' +
        '\n' +
        '                        31-35\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                    <button id="age12" onclick="toggleButton(\'age12\')">\n' +
        '\n' +
        '                        36..\n' +
        '\n' +
        '                    </button>\n' +
        '\n' +
        '                </div>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="country-select">\n' +
        '\n' +
        '                <p>\n' +
        '\n' +
        '                    Країна\n' +
        '\n' +
        '                </p>\n' +
        '\n' +
        '                <select id="country" name="country">\n' +
        '\n' +
        '                    <option value="Київ">\n' +
        '\n' +
        '                        Україна\n' +
        '\n' +
        '                    </option>\n' +
        '\n' +
        '                    <option value="Харків">\n' +
        '\n' +
        '                        Польща\n' +
        '\n' +
        '                    </option>\n' +
        '\n' +
        '                </select>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '\n' +
        '            <div class="region-select">\n' +
        '\n' +
        '                <p>\n' +
        '                    Область\n' +
        '                </p>\n' +
        '\n' +
        '                <select id="region" name="region">\n' +
        '\n' +
        '                    <option value="Київська область">\n' +
        '\n' +
        '                        Київська область\n' +
        '\n' +
        '                    </option>\n' +
        '\n' +
        '                    <option value="Харківська область">\n' +
        '\n' +
        '                        Харківська область\n' +
        '\n' +
        '                    </option>\n' +
        '\n' +
        '                </select>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="look-interlocutor">\n' +
        '\n' +
        '                <button class="look-button" type="button" onclick="validateForm()">\n' +
        '\n' +
        '                    <img src="/icons/search.svg" alt="search">\n' +
        '\n' +
        '                    <p>\n' +
        '\n' +
        '                        Шукати співрозмовника\n' +
        '\n' +
        '                    </p>\n' +
        '\n' +
        '                </button>\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '    </div>\n' +
        '</div>'
}

