function loadSearchUser () {
    let userId = localStorage.getItem('uniqueId');
    fetch('/user/check/room/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            if(data === 'true') {
                window.location.href = '/textchat'
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

setInterval(loadSearchUser, 2000)