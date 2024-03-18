// const stompClient = new StompJs.Client({
//     brokerURL: 'ws://localhost:8080/gs-guide-websocket'
// });
//
// stompClient.onConnect = (frame) => {
//     setConnected(true);
//     console.log('Connected: ' + frame);
//     stompClient.subscribe('/topic/greetings', (greeting) => {
//         showGreeting(JSON.parse(greeting.body).content);
//     });
// };
//
// stompClient.onWebSocketError = (error) => {
//     console.error('Error with websocket', error);
// };
//
// stompClient.onStompError = (frame) => {
//     console.error('Broker reported error: ' + frame.headers['message']);
//     console.error('Additional details: ' + frame.body);
// };
//
// function setConnected(connected) {
//     $("#connect").prop("disabled", connected);
//     $("#disconnect").prop("disabled", !connected);
//     if (connected) {
//         $("#conversation").show();
//     }
//     else {
//         $("#conversation").hide();
//     }
//     $("#greetings").html("");
// }
//
// function connect() {
//     stompClient.activate();
// }
//
// function disconnect() {
//     stompClient.deactivate();
//     setConnected(false);
//     console.log("Disconnected");
// }
//
// function sendName() {
//     stompClient.publish({
//         destination: "/app/hello",
//         body: JSON.stringify({'name': $("#name").val()})
//     });
// }
//
// function showGreeting(message) {
//     $("#greetings").append("<tr><td>" + message + "</td></tr>");
// }
//
// $(function () {
//     $("form").on('submit', (e) => e.preventDefault());
//     $( "#connect" ).click(() => connect());
//     $( "#disconnect" ).click(() => disconnect());
//     $( "#send" ).click(() => sendName());
// });

// ws = new WebSocket("ws://localhost:8080/pong")
//
// ws.onopen = function () {
//     action('open connerction');
// }
//
// ws.onmessage = function (ev) {
//     action(ev.data);
// }
//
// function action(message) {
//     let output = document.getElementById('chat-main')
//     let newP = document.createElement('p');
//     newP.appendChild(document.createTextNode(message));
//     output.appendChild(newP);
// }
//
// function ping() {
//     let message = document.getElementById('messageInput')
//     action('send:' + message)
//     ws.send(message);
// }


let stompClient = null;


window.addEventListener('load', () => {
    connect(); // вызываем connect после загрузки страницы

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendName();
        }
    });

    getChatId(localStorage.getItem('uniqueId'))
});

function getChatId(userId) {
    let chatId = localStorage.getItem('chatId');
    if(chatId === '' || chatId === null) {
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
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }
}



function connect() {
    let socket = new SockJS('/stomp-endpoint');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
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
        stompClient.send("/app/hello", {}, JSON.stringify({'message': message, 'session': localStorage.getItem('uniqueId')}));
    }
}

const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    let spanElem = document.createElement('span');
    let divElem = document.getElementById('chat-main');
    let pElem = document.createElement('p');

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

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
        console.log("Disconnected");
    }
}

// if (message.session === localStorage.getItem('uniqueSession')) {
//     userName = ' Ви:'
// } else {
//     userName = ' Співрозмовник:'
// }

// <p class="my-message">
//
//     <span class="purple"> Ви:</span> Привіт !
//
// </p>

// const onError = (error) => {
//     console.error("Error:", error);
// };
//
// const sendMessage = (msg) => {
//     if (msg.trim() !== "") {
//         const message = {
//             name: msg
//         };
//
//         stompClient.send("/app/hello", {}, JSON.stringify(message));
//     }
// };

// const connect = () => {
//     const Stomp = require("stompjs");
//     let SockJS = require("sockjs-client");
//     SockJS = new SockJS("http://localhost:8080/gs-guide-websocket");
//     stompClient = Stomp.over(SockJS);
//     stompClient.connect({}, onConnected, onError);
// };
//
// const onConnected = () => {
//     console.log("connected");
//
//     stompClient.subscribe(
//         "/topic/greetings",
//         onMessageReceived
//     );
// };