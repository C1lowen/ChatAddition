let intervalId;

function checkRoomActive () {
    let userId = localStorage.getItem('uniqueId');
    let chatId = localStorage.getItem('chatId')
    fetch('/user/active/'+ userId + '/' + chatId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data !== 'true') {
                let divElem = document.getElementById('chat-main');
                let pElem = document.createElement('p');
                let emoji = document.getElementById('emojiPicker')
                let buttonSend = document.getElementById('chat-button');
                let messageInput = document.getElementById('messageInput');
                let emojiButton = document.getElementById('emojiButton')
                pElem.className = 'my-message';
                pElem.textContent = 'Співрозмовник вирішив закінчити бесіду'
                emojiButton.disabled = true
                emoji.style.display = 'none';
                buttonSend.disabled = true;
                messageInput.disabled = true;
                divElem.prepend(pElem)
                localStorage.setItem('chatId', '');
                disconnect()

                clearInterval(intervalId)
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

intervalId = setInterval(checkRoomActive, 4000)