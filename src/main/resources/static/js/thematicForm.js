var modal = document.getElementById("myModal");
var btn = document.getElementById("buttonCreateButton");
var span = document.getElementsByClassName("close")[0];

// Функция открытия модального окна
btn.onclick = function() {
    modal.style.display = "block";
}

// Функция закрытия модального окна при нажатии на "x"
span.onclick = function() {
    modal.style.display = "none";
}

// Функция закрытия модального окна при нажатии вне его области
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Обработка формы
var form = document.getElementById("chatForm");
form.onsubmit = function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    createThematicChat()

    modal.style.display = "none"; // Закрываем модальное окно после создания чата
}

function generateUniqueIdThematic() {
    return Math.random().toString(36).substr(2, 9);
}

function createThematicChat() {
    let chatName = document.getElementById("chatName").value;
    let chatId = 'id-' + Date.now() + generateUniqueIdThematic()


    fetch('/create/thematic', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatName: chatName,
            chatId: chatId,
            typeRoom: 'THEMATIC'
        })
    })
        .then(response => response.text())
        .then(data => {
            let chatName = document.getElementById("chatName").value;
            let blockNameChat = document.getElementById('room-items');
            let buttonElem = document.createElement('button');
            let inputHidden = document.createElement('input')
            inputHidden.value = chatId;
            inputHidden.type = 'hidden'
            buttonElem.appendChild(document.createTextNode(chatName));
            buttonElem.appendChild(inputHidden)
            blockNameChat.prepend(buttonElem);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}