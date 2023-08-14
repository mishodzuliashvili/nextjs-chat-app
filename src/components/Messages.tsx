"use client";
import { useEffect, useRef } from "react";

const Messages = ({
  messages,
  selectedTagOptions = [],
}: {
  messages: Message[];
  selectedTagOptions: TagOption[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedTagOptions]);
  return (
    <div className="h-[calc(100vh-15rem)] overflow-auto p-5">
      <div className="flex flex-col gap-3">
        {selectedTagOptions.length === 0 && (
          <div className="font-semibold text-xl">
            No messages found. Select a tag to see messages with that tag.
          </div>
        )}
        {selectedTagOptions.length > 0 &&
          messages
            .filter(
              (message) =>
                selectedTagOptions.length === 0 ||
                message.tags?.some((tag) =>
                  selectedTagOptions.some(
                    (selectedTagOption) =>
                      selectedTagOption.value === tag.tagName
                  )
                )
            )
            .map((message) => {
              return (
                <div
                  key={message.id}
                  className="flex flex-col border p-3 rounded-md gap-3"
                >
                  <span className="font-medium">{message.content} </span>
                  <div className="flex gap-1">
                    {message.tags?.map((tag) => (
                      <span
                        key={tag.id}
                        className="flex text-white rounded-full bg-[#3186f6] uppercase px-2 py-1 text-xs font-bold mr-3"
                      >
                        {tag.tagName}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
      </div>
      <div style={{ float: "left", clear: "both" }} ref={ref}></div>
    </div>
  );
};

export default Messages;
