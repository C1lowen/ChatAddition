async function validateForm(typeRoom) {
    let genderUser = getGenderUser();
    let ageUser = getAgeUser();
    let gendersSearchUser = getGenderSearchUser();
    let agesSearchUser = getAgeSearchUser();
    let country = getCountry();
    let city = getCity();

    if(genderUser === '' || ageUser === ''
        || !gendersSearchUser.length || !agesSearchUser.length
        || country === '' || city === '') {
        alert("Виберіть варіант для пошуку в кожному блоці")
        return
    }
    let isNotBanned = await checkBanned();
    if (isNotBanned) {
        typeRoom === 'DEFAULT' ? formSearchUser() : formSearchUserAdult()
        let objectUser = {
            id: localStorage.getItem('uniqueId'),
            gender: genderUser,
            age: ageUser,
            infoUser: {
                searchGender: gendersSearchUser,
                searchAge: agesSearchUser,
                country: country,
                city: city
            },
            typeRoom: typeRoom
        };
        console.log(objectUser);
        localStorage.setItem('chatId', '');
        sendInfoServer(objectUser);
    }
}

// function checkBanned() {
//     let userId = localStorage.getItem('uniqueId');
//     return fetch('/user/check/banned/' + userId, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.text())
//         .then(data => {
//             if (data !== '-1') {
//                 alert('Вас заблоковано! Бан пройде через ' + data + ' хвилин');
//                 return false;
//             }
//             return true;
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//             return false;
//         });
// }

function formSearchUser() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    mainContent.innerHTML = '<div class="container">\n' +
        '    <div class="loader-container">\n' +
        '        <div class="loader">\n' +
        '            <svg viewBox="0 0 100 100">\n' +
        '                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '                <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '                <circle cx="50" cy="50" r="20" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '            </svg>\n' +
        '        </div>\n' +
        '        <p class="loader-text">Пошук партнера...</p>\n' +
        '        <button class="cancel-button" onclick="cancelSearch()">Скасувати пошук</button>\n' +
        '    </div>\n' +
        '</div>'
}

function formSearchUserAdult() {
    let mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';
    console.log('hello')
    mainContent.innerHTML = '<div class="container">\n' +
        '    <div class="loader-container">\n' +
        '        <div class="loader">\n' +
        '            <svg viewBox="0 0 100 100">\n' +
        '                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '                <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '                <circle cx="50" cy="50" r="20" stroke="currentColor" stroke-width="10" fill="none" />\n' +
        '            </svg>\n' +
        '        </div>\n' +
        '        <p class="loader-text">Пошук партнера...</p>\n' +
        '        <button class="cancel-button" onclick="cancelSearchAdult()">Скасувати пошук</button>\n' +
        '    </div>\n' +
        '</div>'
}

function sendInfoServer(user) {
    fetch('/user/add/queue', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.text())
        .then(data => {
            if(data !== '') {
                window.location.href = '/textchat'
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}



function getGenderUser() {
    let buttons = document.querySelectorAll('.orientation-block button');

    let activeButtonInputValue = '';

    buttons.forEach(function(button) {
        if (button.classList.contains('active')) {
            console.log('------------------------' + button.querySelector('input').value)
            activeButtonInputValue = button.querySelector('input').value;
        }
    });

    return activeButtonInputValue;
}


function getAgeUser() {
    let buttons = document.querySelectorAll('.my-age-block button');


    let activeButtonText = '';

    buttons.forEach(function(button) {
        if (button.classList.contains('active')) {
            activeButtonText = button.textContent.trim();
        }
    });

    return activeButtonText;
}

function getGenderSearchUser() {
    var activeButtons = document.querySelectorAll('.looking-age-block button');
    var texts = [];
    activeButtons.forEach(function(button) {
        if (button.classList.contains('active')) {
            texts.push(button.querySelector('input').value);
        }
    });
    return texts;
}

function getAgeSearchUser() {
    var activeButtons = document.querySelectorAll('.looking-block button');
    var texts = [];
    activeButtons.forEach(function(button) {
        if (button.classList.contains('active')) {
            texts.push(button.textContent.trim());
        }
    });
    return texts;
}

function getCountry() {
    var selectElement = document.getElementById("country");
    var selectedOptionIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedOptionIndex];
    return  selectedOption.textContent.trim();
}

function getCity() {
    var selectElement = document.getElementById("region");
    var selectedOptionIndex = selectElement.selectedIndex;
    var selectedOption = selectElement.options[selectedOptionIndex];
    return  selectedOption.textContent.trim();
}





