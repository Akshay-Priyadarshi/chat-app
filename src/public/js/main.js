const socket = io();

const chats = [];

const sendButton = document.getElementById("send");
const messageInput = document.getElementById("message");
const chatDiv = document.getElementById("chat");

socket.on("connect", () => {
    socket.on("chat", (payload) => {
        console.log("Message recieved - " + payload.message);
        chats.push(payload);
        chatDiv.innerHTML = "";
        chats.forEach((chat) => {
            const chatElement = document.createElement("p");
            chatElement.className = "chat-message";
            chatElement.innerText = chat.message;
            chatDiv.appendChild(chatElement);
        });
    });
});

socket.on("disconnect", () => {
    console.log(socket.id);
});

sendButton.addEventListener("click", () => {
    console.log("Message sent - " + messageInput.value);
    if (messageInput.value != "") {
        socket.emit("chat", { message: messageInput.value });
        messageInput.value = "";
    }
});
