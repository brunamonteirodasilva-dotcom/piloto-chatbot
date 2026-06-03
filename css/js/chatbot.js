const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

chatButton.addEventListener("click", () => {
chatWindow.style.display = "block";
});

closeChat.addEventListener("click", () => {
chatWindow.style.display = "none";
});
