const isIt = window.location.href.indexOf("chat-room.html") ? true : false;
console.log(isIt)
if (isIt) {
    getMessage();

    let chatRoomLogin = 0;

    setInterval(function () {
        getMessage();
        console.log("Time and time again");
    }, 10000);
}
function getMessage() {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            let message = JSON.parse(xhttp.responseText).messagesArray;
            try {
                loadMessage(message);
            } catch (err) {

            }
        }
    }
    xhttp.open('GET', 'https://ajax.igor-marty.fr/messages', true)
    xhttp.send()
}

function loadMessage(messages) {
    console.log(messages);
    const chatBox = document.querySelector(".chatBox");
    chatBox.innerText = "";
    for (const message of messages) {
        let newLi = document.createElement("li");
        let newLabel = document.createElement("label");
        newLabel = message.user;
        newLi.innerText = message.message;
        chatBox.append(newLabel);
        chatBox.append(newLi);
    }
}

try {
    const submitMessage = document.querySelector(".submitMessage")
    submitMessage.addEventListener("submit", postMessage);
} catch (err) {
}

function postMessage() {
    event.preventDefault();
    const textArea = document.querySelector("#textArea").value;
    fetch('https://ajax.igor-marty.fr/messages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            hash: localStorage.getItem("chatRoomLogin"),
            message: textArea
        })
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            getMessage();
            document.getElementById('textArea').value = '';
        })
        .catch((err) => console.log(err));
    console.log(textArea);
}




/*let xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        let message = JSON.parse(xhttp.responseText);
        console.log(message);
    } else {
    }
}
xhttp.open('POST', 'https://ajax.igor-marty.fr/messages', true);
xhttp.send(JSON.stringify({ message: textArea }));
}*/





try {
    const signUp = document.querySelector(".signUp");
    signUp.addEventListener("submit", singUpNow)
} catch (err) {
}
function singUpNow() {
    event.preventDefault();
    const userName = document.querySelector("#userName").value;
    const passWord = document.querySelector("#passWord").value;

    fetch('https://ajax.igor-marty.fr/signin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: userName,
            password: passWord
        })
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("chatRoomLogin", data.code);
            window.location.href = "./chat-room.html";
        })
        .catch((err) => console.log(err));
}

try {
    const login = document.querySelector(".login")
    login.addEventListener("submit", logIn)
} catch (err) {

}

function logIn() {
    event.preventDefault();
    const userName = document.querySelector("#userLoginID").value;
    const passWord = document.querySelector("#userLoginPW").value;

    fetch('https://ajax.igor-marty.fr/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: userName,
            password: passWord
        })
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("chatRoomLogin", data.code);
            window.location.href = "./chat-room.html";
        })
        .catch((err) => console.log(err));
}