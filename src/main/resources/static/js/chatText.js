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


function checkActiveChat() {
    let userId = localStorage.getItem('uniqueId')

    fetch('/chat/active/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            if(data !== 'true') {
                exitChat()
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

setInterval(checkActiveChat, 500);

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