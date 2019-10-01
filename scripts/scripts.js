let xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        let message = JSON.parse(xhttp.responseText).messagesArray;
        console.log(message);
        message.forEach()
    }
}
xhttp.open('GET', 'https://ajax.igor-marty.fr/messages', true)
xhttp.send()

function 