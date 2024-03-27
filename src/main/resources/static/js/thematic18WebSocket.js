window.addEventListener('load', () => {
    connectWebSocketThematic18()
});


var form = document.getElementById("chatForm");
form.onsubmit = function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    let chatName = document.getElementById("chatName");
    let validNameChatTag = document.getElementById('not-valid-nameChat')
    let isValidChat = validNameChat(chatName.value)
    if(isValidChat) {
        saveThematic18Chat()
        chatName.textContent = ''
        validNameChatTag.textContent = ''
        modal.style.display = "none";
    }
}



//WebSocket

function connectWebSocketThematic18() {
    let socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/chat/save/thematic18', function (greeting) {
            addHTMLChat(greeting)
        });
        stompClient.subscribe('/user/all/thematicRoom/delete', function (greeting) {
            let listOverdueChat = JSON.parse(greeting.body);
            deleteOverdue(listOverdueChat);
        });
    });
}





function saveThematic18Chat() {
    let chatName = document.getElementById("chatName").value;
    let chatId = 'id-' + Date.now() + generateUniqueIdThematic()


    stompClient.send("/app/thematic18" , {}, JSON.stringify({chatName: chatName, chatId: chatId, typeRoom: 'THEMATIC18'}) );
}