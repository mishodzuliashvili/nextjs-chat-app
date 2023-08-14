"use client";

import { useState } from "react";
import MyMultiSelect from "./MyMultiSelect";

const MyInput = ({
  messageContent,
  setMessageContent,
}: {
  messageContent: string;
  setMessageContent: (messageContent: string) => void;
}) => {
  return (
    <input
      type="text"
      required
      className="border border-[#cccccc] outline-none p-3 w-full rounded-md"
      value={messageContent}
      placeholder="Enter your message..."
      onChange={(e) => setMessageContent(e.target.value)}
    />
  );
};

export default MyInput;
