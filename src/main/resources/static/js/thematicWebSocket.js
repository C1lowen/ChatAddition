window.addEventListener('load', () => {
    connectWebSocketThematic()
});


var form = document.getElementById("chatForm");
form.onsubmit = function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    let chatName = document.getElementById("chatName");
    let validNameChatTag = document.getElementById('not-valid-nameChat')
    let isValidChat = validNameChat(chatName.value)
    let validBanWordBool = validBanWord(chatName.value)
    if(isValidChat && validBanWordBool) {
        saveThematicChat()
        chatName.textContent = ''
        validNameChatTag.textContent = ''
        modal.style.display = "none";
    }
}


//WebSocket

function connectWebSocketThematic() {
    let socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/user/chat/save/thematic', function (greeting) {
            addHTMLChat(greeting)
        });
        stompClient.subscribe('/user/all/thematicRoom/delete', function (greeting) {
            let listOverdueChat = JSON.parse(greeting.body);
            deleteOverdue(listOverdueChat);
        });
    });
}


// stompClient.subscribe('/user/chat/overdue/thematic', function (greeting) {
//     let listOverdueChat = JSON.parse(greeting.body);
//     deleteOverdue(listOverdueChat);
// });


// function checkNotActiveAndDeleteRoom() {
//     stompClient.send("/app/overdue/thematic")
// }


function saveThematicChat() {
    let chatName = document.getElementById("chatName").value;
    let chatId = 'id-' + Date.now() + generateUniqueIdThematic()


    stompClient.send("/app/thematic" , {}, JSON.stringify({chatName: chatName, chatId: chatId, typeRoom: 'THEMATIC'}) );
}