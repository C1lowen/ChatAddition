let intervalId;

function checkRoomActive() {
    let userId = localStorage.getItem('uniqueId');
    let chatId = localStorage.getItem('chatId')
    fetch('/user/active/'+ userId + '/' + chatId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let divElem = document.getElementById('chat-main');
            let pElem = document.createElement('p');

            if(data.active === true && data.isAllUser === false) {
                pElem.className = 'my-message';
                pElem.textContent = 'Поки співрозмовника немає. Ми вас повідомимо як тільки хтось до вас доєднається'
                divElem.prepend(pElem)
                clearInterval(intervalId)
                intervalId = setInterval(checkRoomActive, 60000)
            }else if (data.active === false) {
                pElem.className = 'my-message';
                pElem.textContent = 'Співрозмовник вирішив закінчити бесіду'
                noActiveButton()
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