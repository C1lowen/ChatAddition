function checkBanned() {
    let userId = localStorage.getItem('uniqueId');
    return fetch('/user/check/banned/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data !== '-1') {
                alert('Вас заблоковано! Бан пройде ' + data);
                return false;
            }
            return true;
        })
        .catch(error => {
            console.error('Ошибка:', error);
            return false;
        });
}