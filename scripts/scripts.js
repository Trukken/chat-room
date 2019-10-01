const isIt = window.location.href.indexOf("chat-room.html") ? true : false;
if (isIt) {
    getMessage();

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
        newLi.classList.add("message");
        let incMessage = document.createElement("p1");
        let div = document.createElement("div");
        let date = document.createElement("p");
        let userName = document.createElement("h4");
        date.innerText = message.date;
        userName.innerText = message.user;
        userName.classList.add("userName");
        incMessage.innerText = message.message;
        chatBox.append(newLi);
        newLi.append(div);
        div.append(userName);
        div.append(incMessage);
        div.append(date);
    }
}

try {
    const submitMessage = document.querySelector(".submitMessage")
    submitMessage.addEventListener("submit", postMessage);
    submitMessage.addEventListener("keydown", checkMessage)
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
            getMessage();
            document.getElementById('textArea').value = '';
        })
        .catch((err) => console.log(err));
    console.log(textArea);
}


function checkMessage() {
    const textArea = document.querySelector("#textArea");
    if (textArea.value.length >= 139) {
        textArea.style.borderColor = "red";
    } else {
        textArea.style.borderColor = "gray";
    }
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
            if (data.code == -1 || data.code == 0) {
                alert("Something went wrong, check the user name and the password.")
            } else {
                localStorage.setItem("chatRoomLogin", data.code);
                window.location.href = "./chat-room.html";
            }
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
            if (data.code == 0) {
                alert("Something went wrong, check the user name and the password.")
            } else {
                localStorage.setItem("chatRoomLogin", data.code);
                window.location.href = "./chat-room.html";
            }
        })
        .catch((err) => console.log(err));
}