"use client";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageSender from "./MessageSender";
import MySidebar from "./MySidebar";
import useLocalStorage from "use-local-storage";

const MainComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [toggledSidebar, setToggledSidebar] = useState(false);
  const [selectedTagOptions, setSelectedTagOptions] = useLocalStorage<
    TagOption[]
  >("selectedTagOptions", []);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);

  const fetchTags = async () => {
    const response = await fetch("/api/tags");
    const data: { tags: Tag[] } = await response.json();
    setTagOptions(
      data.tags.map((tag) => ({ value: tag.tagName, label: tag.tagName }))
    );
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchMessages = async () => {
    const response = await fetch("/api/messages");
    const data: { messages: Message[] } = await response.json();
    setMessages(data.messages);
  };

  useEffect(() => {
    const pusher = new Pusher("dcb6404f028ee60eb750", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data: { message: Message }) {
      setMessages((oldMessages) => [...oldMessages, data.message]);
    });
    fetchMessages();
  }, []);
  return (
    <div className="max-h-screen">
      <MySidebar
        setToggledSidebar={setToggledSidebar}
        toggledSidebar={toggledSidebar}
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
        selectedTagOptions={selectedTagOptions}
        setSelectedTagOptions={setSelectedTagOptions}
      />
      <Messages messages={messages} selectedTagOptions={selectedTagOptions} />

      <MessageSender
        selectedTagOptions={selectedTagOptions}
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
        setSelectedTagOptions={setSelectedTagOptions}
        setToggledSidebar={setToggledSidebar}
      />
    </div>
  );
};

export default MainComponent;
