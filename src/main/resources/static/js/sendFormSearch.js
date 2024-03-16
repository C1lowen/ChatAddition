function validateForm() {
    let genderUser = getGenderUser();
    let ageUser = getAgeUser();
    let gendersSearchUser = getGenderSearchUser();
    let agesSearchUser = getAgeSearchUser();
    let country = getCountry();
    let city = getCity();

    // console.log(genderUser)
    // console.log(ageUser)
    // console.log(gendersSearchUser)
    // console.log(agesSearchUser)
    // console.log(country)
    // console.log(city)

    if(genderUser === '' || ageUser === ''
        || !gendersSearchUser.length || !agesSearchUser.length
        || country === '' || city === '') {
        alert("Виберіть варіант для пошуку в кожному блоці")
        return
    }

    let objectUser =  {
        id: localStorage.getItem('uniqueId'),
        gender: genderUser,
        age: ageUser,
        infoUser: {
            searchGender: gendersSearchUser,
            searchAge: agesSearchUser,
            country: country,
            city: city
        }
    }

    console.log(objectUser)

    sendInfoServer(objectUser)
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
            console.log(data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function getGenderUser() {
    let buttons = document.querySelectorAll('.looking-age-block button');

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
    var activeButtons = document.querySelectorAll('.orientation-block button');
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





