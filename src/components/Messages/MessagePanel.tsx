"use client";
import { useMain } from "@/app/context";
import React from "react";
import Message from "./Message";
import ScrollToBottom from "./ScrollToBottom";

function hasMessageTagName(message: Message, tagName: string) {
  return message.tags.some((tag) => tag.tagName === tagName);
}

function filterMessagesByTagOptions(
  messages: Message[],
  tagOptions: TagOption[]
) {
  return messages.filter((message) =>
    tagOptions.some(
      (tag) =>
        hasMessageTagName(message, tag.value) || message.tags.length === 0
    )
  );
}

const MessagePanel = () => {
  const { messages, activeTagOptions } = useMain();
  const filteredMessages = filterMessagesByTagOptions(
    messages,
    activeTagOptions
  );

  if (filteredMessages.length === 0) {
    return (
      <h2 className="font-semibold text-xl">
        No messages found. Select a tag to see messages with that tag.
      </h2>
    );
  }

  return (
    <ScrollToBottom scrollDependecyList={[messages, activeTagOptions]}>
      <div className="flex flex-col gap-3 w-full">
        {filteredMessages.map((message) => (
          <Message message={message} key={message.id} />
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default MessagePanel;
