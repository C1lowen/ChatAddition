

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
// var form = document.getElementById("chatForm");
// form.onsubmit = function(event) {
//     event.preventDefault(); // Предотвращаем отправку формы
//     // createThematicChat()
//     saveThematicChat()
//     modal.style.display = "none"; // Закрываем модальное окно после создания чата
// }

function generateUniqueIdThematic() {
    return Math.random().toString(36).substr(2, 9);
}



// function createThematicChat() {
//     let chatName = document.getElementById("chatName").value;
//     let chatId = 'id-' + Date.now() + generateUniqueIdThematic()
//
//
//     fetch('/create/thematic', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             chatName: chatName,
//             chatId: chatId,
//             typeRoom: 'THEMATIC'
//         })
//     })
//         .then(response => response.text())
//         .then(data => {
//
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// }


// function addHTMLChat(payload) {
//     const answer = JSON.parse(payload.body);
//     let chatName = answer.chatName
//     let blockNameChat = document.getElementById('room-items');
//     let buttonElem = document.createElement('button')
//     buttonElem.value = answer.chatId;
//     buttonElem.onclick = function() {
//         saveRoomUser(answer.chatId, 'THEMATIC');
//     };
//     buttonElem.appendChild(document.createTextNode(chatName));
//     blockNameChat.prepend(buttonElem);
// }

//WebSocket

// function connectWebSocketThematic() {
//     let socket = new SockJS('/stomp-endpoint');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame) {
//         console.log('Connected: ' + frame);
//         stompClient.subscribe('/user/chat/save/thematic', function (greeting) {
//             addHTMLChat(greeting)
//         });
//     });
// }



// function saveThematicChat() {
//     let chatName = document.getElementById("chatName").value;
//     let chatId = 'id-' + Date.now() + generateUniqueIdThematic()
//
//
//     stompClient.send("/app/thematic" , {}, JSON.stringify({chatName: chatName, chatId: chatId, typeRoom: 'THEMATIC'}) );
// }

async function saveRoomUser(chatId, typeChat) {
    let isNotBanned = await checkBanned();
    if (isNotBanned) {
        let userId = localStorage.getItem('uniqueId')
        fetch('/user/save/thematic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: userId,
                room: {
                    chatId: chatId
                },
                typeRoom: typeChat
            })
        })
            .then(response => response.text())
            .then(data => {
                if (data === 'true') {
                    localStorage.setItem('chatId', chatId)
                    window.location.href = '/textchat'
                } else {
                    alert('На данний момент чат неактивний')
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }
}


function deleteOverdue(listOverdueChat) {
    var buttons = document.querySelectorAll('#room-items button');
    console.log('------------------------------------------------!!!))')
    buttons.forEach(function(button) {
        if (listOverdueChat.includes(button.value)) {
            button.remove();
        }
    });
}


async function addHTMLChat(payload) {
    const answer = JSON.parse(payload.body);
    let chatName = answer.chatName
    let isValidChat = await checkThematicRoom(answer.chatId)
    console.log(!isValidChat)
    if (!isValidChat) {
        let blockNameChat = document.getElementById('room-items');
        let buttonElem = document.createElement('button')
        buttonElem.value = answer.chatId;
        buttonElem.onclick = function () {
            saveRoomUser(answer.chatId, answer.typeRoom);
        };
        buttonElem.appendChild(document.createTextNode(chatName));
        blockNameChat.prepend(buttonElem);
    }
}

function checkThematicRoom(chatId) {
    return [...document.querySelectorAll('#room-items button')].some(button => button.value.includes(chatId));
}

function validNameChat(nameChat) {
    let validNameChat = document.getElementById('not-valid-nameChat')
    if(nameChat.length > 20) {
        validNameChat.textContent = 'Чат може мати назву не більше 20 символів'
        return false;
    }
    if(nameChat.length < 3) {
        validNameChat.textContent = 'Чат може мати назву не менше 3 символів'
        return false;
    }
    return true;
}

function validBanWord(nameChat) {
    let validNameChat = document.getElementById('not-valid-nameChat')

    let checkBanWord = validateRoomName(nameChat)
    if(!checkBanWord) {
        validNameChat.textContent = 'Назва кімнати містить неприйнятні слова'
        return false;
    }

    return true;
}
