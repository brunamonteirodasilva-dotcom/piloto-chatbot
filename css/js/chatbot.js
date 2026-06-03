window.onload = function() {

    const chatButton = document.getElementById("chatButton");
    const chatWindow = document.getElementById("chatWindow");
    const closeChat = document.getElementById("closeChat");

    console.log("Botão:", chatButton);
    console.log("Janela:", chatWindow);

    chatButton.onclick = function() {
        console.log("CLICOU");
        chatWindow.style.display = "block";
    };

    closeChat.onclick = function() {
        chatWindow.style.display = "none";
    };

};
