"use client";

import { useEffect, useState } from "react";
import MyInput from "./MyInput";
import MyMultiSelect from "./MyMultiSelect";
import MyButton from "./MyButton";

const MessageSender = ({
  setToggledSidebar,
  setSelectedTagOptions,
  selectedTagOptions,
  tagOptions,
  setTagOptions,
}: {
  setToggledSidebar: any;
  setSelectedTagOptions: any;
  tagOptions: TagOption[];
  setTagOptions: any;
  selectedTagOptions: TagOption[];
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [senderSelectedTagOptions, setSenderSelectedTagOptions] = useState<
    TagOption[]
  >([]);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (messageContent === "") return;
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: messageContent,
        tags: senderSelectedTagOptions.map((tag) => tag.value),
      }),
    });
    if (!res.ok) {
      console.error("Error sending message");
    }
    setSelectedTagOptions((prev: any) => [
      ...prev,
      ...senderSelectedTagOptions.filter(
        (tagOption: TagOption) => prev.indexOf(tagOption) === -1
      ),
    ]);

    setMessageContent("");
    setSenderSelectedTagOptions([]);
  };
  return (
    <div className="p-5 flex gap-4 flex-col items-start fixed bottom-0 left-0 w-full">
      <form onSubmit={sendMessage} className="w-full">
        <MyInput
          messageContent={messageContent}
          setMessageContent={setMessageContent}
        />
      </form>
      <MyMultiSelect
        tagOptions={tagOptions}
        setTagOptions={setTagOptions}
        senderSelectedTagOptions={senderSelectedTagOptions}
        setSenderSelectedTagOptions={setSenderSelectedTagOptions}
      />
      <div className="flex gap-4">
        <MyButton onMouseDown={sendMessage} type="github">
          Send Message
        </MyButton>
        <MyButton
          onMouseDown={() => setToggledSidebar((prev: boolean) => !prev)}
          type="messenger"
        >
          Open Tags Sidebar
        </MyButton>
      </div>
    </div>
  );
};

export default MessageSender;
