import { io } from "socket.io-client";

const socket = io();

socket.on("message", (body) => {
    const newMessage = Message({ body });
    messageList.appendChild(newMessage);
    newMessage.scrollIntoView();
})

function Message(props: { body: string }) {
    const el = Div({
        class: "message"
    });

    el.innerText = props.body;

    return el;
}

function MessageList() {
    const el = Div({
        class: "message-list"
    });

    fetch("/api/rooms/611f1cca1def03484db6db32/messages").then(async (res) => {
        const jsonData = await res.json();
        const messages = jsonData.data;
        for (const message of messages) {
            el.appendChild(Message({ body: message.body }));
        }
    })

    return el;
}

function Div(attributes: { id?: string, class?: string } = {}) {
    const div = document.createElement("div");

    for (const attribute in attributes) {
        div.setAttribute(attribute, attributes[attribute]);
    }

    return div;
}

function Input() {
    return document.createElement("input");
}

function TextBox(props: { onSubmit: (text: string) => void; }) {
    const el = Div({
        class: "textbox"
    });

    const input = Input();

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            props.onSubmit(input.value);
            input.value = "";
        }
    })

    el.appendChild(input);

    return el;
}

const root = document.getElementById("root");

const messageList = MessageList();

function handleSubmit(text: string) {
    fetch("/api/rooms/611f1cca1def03484db6db32/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ body: text }),
    }).catch((err) => {
        alert(err.message);
    });
}

const textBox = TextBox({ onSubmit: handleSubmit });

root.appendChild(messageList);
root.appendChild(textBox);