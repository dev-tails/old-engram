import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Message, messageApi } from "../apis/MessageApi";
import { List } from "../components/List";

type RoomPageProps = {};

type RoomPageParams = {
  id: string;
};

export const RoomPage: React.FC<RoomPageProps> = (props) => {
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const params = useParams<RoomPageParams>();

  useEffect(() => {
    function fetchMessages() {
      messageApi.getMessages(params.id).then(setMessages);
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [params.id]);

  async function handleSubmit() {
    setBody("");

    const savedMessage = await messageApi.createMessage({
      room: params.id,
      body,
    });

    setMessages([...messages, savedMessage]);
  }

  const listItems = messages.map((message) => {
    return {
      _id: message._id,
      title: message.body,
    };
  });

  return (
    <div className="room-page container">
      <List items={listItems}></List>
      <input
        value={body}
        onChange={(e) => {
          setBody(e.currentTarget.value);
        }}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
