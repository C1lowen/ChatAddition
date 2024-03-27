document.addEventListener('DOMContentLoaded', function() {
    const emojiButton = document.getElementById('emojiButton');
    const emojiPicker = document.getElementById('emojiPicker');

    // Переключаем видимость смайликов при клике на кнопку или любой ее дочерний элемент
    emojiButton.addEventListener('click', function(event) {
        if (window.getComputedStyle(emojiPicker).display === 'none') {
            emojiPicker.style.display = 'block';
        } else {
            emojiPicker.style.display = 'none';
        }
        event.stopPropagation(); // Остановка всплытия события, чтобы оно не достигло document
    });

});

window.addEventListener('beforeunload', function (event) {
    // Текст сообщения
    var message = '[eq[eq[eq]';

    // Отображение confirm-окна
    event.returnValue = confirm(message);
});

function bannedUserClick() {
    let userId = localStorage.getItem('uniqueId');

    fetch('/user/set/banned', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userId
    })
        .then(response => response.text())
        .then(data => {
            if(data === 'true') {
                stompClient.send("/app/chat/" + localStorage.getItem('chatId'), {}, JSON.stringify({
                    'message': '',
                    'session': localStorage.getItem('uniqueId'),
                    'action': 'BANNED'
                }));
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function checkActiveChatId() {
    let userId = localStorage.getItem('uniqueId');
    let chatId = localStorage.getItem('chatId')
    if(chatId === '' || chatId === null || userId === '' || userId === null) {
        window.location.href = '/'
    }
    fetch('/user/active/' + userId + '/' + chatId , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.active === false) {
                // localStorage.setItem('chatId', '')
                window.location.href = '/'
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// function checkActiveChat() {
//     let userId = localStorage.getItem('uniqueId')
//
//     fetch('/chat/active/' + userId, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.text())
//         .then(data => {
//             console.log(data)
//             if(data !== 'true') {
//                 exitChat()
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// }

// setInterval(checkActiveChat, 500);

function insertEmoji(emoji) {
    document.getElementById('messageInput').value += emoji;
}

function exitChat() {
    localStorage.setItem('chatId', '');
    deleteInfoUserServer()
    disconnect()
    window.location.href = '/'
}

function deleteInfoUserServer() {
    let userId = localStorage.getItem('uniqueId')

    fetch('/user/delete/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });

}

