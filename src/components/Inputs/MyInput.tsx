"use client";

import { Dispatch } from "react";

const MyInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      type="text"
      required
      className="border border-[#cccccc] outline-none p-4 w-full rounded-full"
      value={value}
      placeholder="Enter your message..."
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default MyInput;
