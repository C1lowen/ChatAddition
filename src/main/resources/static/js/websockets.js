let stompClient = null;


window.addEventListener('load', () => {
     // вызываем connect после загрузки страницы

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendName();
        }
    });

    setChatId(localStorage.getItem('uniqueId'))
});


function setChatId(userId) {
    let chatId = localStorage.getItem('chatId');
    if (chatId === '' || chatId === null) {
        fetch('/user/chat/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                localStorage.setItem('chatId', data)
                checkActiveChatId()
                connect()
                // getOldMessages()
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        }else {
            checkActiveChatId()
             connect()
        // getOldMessages()
        }

}

function getOldMessages() {
    let divElem = document.getElementById('chat-main');
    let chatId = localStorage.getItem('chatId')
    fetch('/get/message/' + chatId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            generateMessageHTML(data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function generateMessageHTML(messages) {

    let userId = localStorage.getItem('uniqueId');
    const chatMain = document.getElementById('chat-main');

    // Очищаем содержимое контейнера
    chatMain.innerHTML = '';

    // Проходимся по каждому сообщению в полученном списке
    messages.forEach(message => {
        let classP = (userId === message.session) ? 'my-message' : 'your-message';
        const messageElement = document.createElement('p');
        messageElement.classList.add(classP); // Добавляем класс для стилизации

        let classSpan = (userId === message.session) ? 'purple' : 'red';
        const userSpan = document.createElement('span');
        userSpan.classList.add(classSpan);

        // Устанавливаем имя пользователя
        userSpan.textContent = (userId === message.session) ? ' Ви:' : ' Співрозмовник:';

        const textNode = document.createTextNode(' ' + message.message);

        // Добавляем span'ы в элемент сообщения
        messageElement.appendChild(userSpan);
        messageElement.appendChild(textNode)

        // Добавляем элемент сообщения в контейнер
        chatMain.prepend(messageElement);
    });
}

function connect() {

    let userId = localStorage.getItem('uniqueId')
    let chatId = localStorage.getItem('chatId')

    let socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    console.log('----------!! ' + chatId + ' --lollll')
    stompClient.connect({userId, chatId}, function (frame) {
        console.log('Connected: ' + frame);
        let currentUserId = localStorage.getItem('uniqueId');
        stompClient.subscribe('/user/'+ localStorage.getItem('chatId') +'/message', function (greeting) {
            onMessageReceived(greeting)
        });
    });
}



function sendName() {
    let messageInput = document.getElementById('messageInput');

    let message = messageInput.value;

    if (message.trim() !== "") {
        messageInput.value = ''
        stompClient.send("/app/chat/" + localStorage.getItem('chatId'), {}, JSON.stringify({'message': message, 'session': localStorage.getItem('uniqueId'), 'action': 'MESSAGE'}) );
    }
}

function disconnectChatAll() {
    let confirmation = confirm("Ви впевнені, що хочете вийти? Ви більше не зможете повернутися до цього листування!");
    if(confirmation){
         stompClient.send("/app/chat/" + localStorage.getItem('chatId'), {}, JSON.stringify({'message': '', 'session': localStorage.getItem('uniqueId'), 'action': 'DELETE'}) );
    }
}

const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);

    let spanElem = document.createElement('span');
    let divElem = document.getElementById('chat-main');
    let pElem = document.createElement('p');

    if(message.action === 'DELETE') {
        disabledDisconnectChat(message)
        return
    } else if (message.action === 'BANNED') {
        bannedUserInChat(message)
        return;
    }
    
    let userName = null;
    if (message.session === localStorage.getItem('uniqueId')){
        userName = ' Ви:'
        spanElem.style.color = '#e032e3'
    }else {
        userName = ' Співрозмовник:';
        spanElem.style.color = '#d91a1a'
    }

    pElem.className = 'my-message';
    spanElem.className = 'purple';
    spanElem.textContent = userName;
    pElem.appendChild(spanElem);
    pElem.appendChild(document.createTextNode(' ' + message.message));
    divElem.prepend(pElem);
};

function disabledDisconnectChat(message) {
    let divElem = document.getElementById('chat-main');
    let pElem = document.createElement('p');
    let emoji = document.getElementById('emojiPicker')
    let buttonSend = document.getElementById('chat-button');
    let messageInput = document.getElementById('messageInput');
    let emojiButton = document.getElementById('emojiButton')

    pElem.className = 'my-message';
    if (message.session === localStorage.getItem('uniqueId')){
        pElem.textContent = 'Ви вирішили закінчити бесіду'
    }else {
        pElem.textContent = 'Співрозмовник вирішив закінчити бесіду'
    }
    emojiButton.disabled = true
    emoji.style.display= 'none';
    buttonSend.disabled = true;
    messageInput.disabled = true;
    divElem.prepend(pElem)
    localStorage.setItem('chatId', '');
    // deleteInfoUserServer()
    disconnect()
}

function bannedUserInChat(message) {
    let divElem = document.getElementById('chat-main');
    let pElem = document.createElement('p');
    let emoji = document.getElementById('emojiPicker')
    let buttonSend = document.getElementById('chat-button');
    let messageInput = document.getElementById('messageInput');
    let emojiButton = document.getElementById('emojiButton')

    pElem.className = 'my-message';
    if (message.session === localStorage.getItem('uniqueId')){
        pElem.textContent = 'Ви заблокували користувача на 30 хвилин'
    }else {
        pElem.textContent = 'Співрозмовник заблокував вас. Ви не можете спілкуватись 30 хвилин'
    }
    emojiButton.disabled = true
    emoji.style.display= 'none';
    buttonSend.disabled = true;
    messageInput.disabled = true;
    divElem.prepend(pElem)
    localStorage.setItem('chatId', '');
    // deleteInfoUserServer()
    disconnect()
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
        clearInterval(intervalId)
        console.log("Disconnected");
    }
}

