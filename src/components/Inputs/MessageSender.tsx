"use client";
import React, { useState } from "react";
import MyInput from "./MyInput";
import { createMessage } from "@/utils/messages";
import { useMain } from "@/app/context";
import MyMultiSelect from "./MyMultiSelect";

const MessageSender = () => {
  const [messageContent, setMessageContent] = useState<string>("");
  const [selectedTagOptions, setSelectedTagOptions] = useState<TagOption[]>([]);
  const {
    setError,
    tagOptions,
    setActiveTagOptions,
    activeTagOptions,
    setToggledTagPanel,
    setTagOptions,
  } = useMain();

  const addTagOptionsToActives = () => {
    const newActiveTagOptions = selectedTagOptions.filter(
      (selectedTagOption) =>
        !activeTagOptions.find(
          (activeTagOption) => activeTagOption.value === selectedTagOption.value
        )
    );
    setActiveTagOptions((oldActiveTagOptions) => [
      ...oldActiveTagOptions,
      ...newActiveTagOptions,
    ]);
  };
  const addNewTagsToTagOptions = () => {
    const newTagOptions = selectedTagOptions.filter(
      (selectedTagOption) =>
        !tagOptions.find(
          (tagOption) => tagOption.value === selectedTagOption.value
        )
    );
    setTagOptions((oldTagOptions) => [...oldTagOptions, ...newTagOptions]);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    const selectedTagNames = selectedTagOptions.map(
      (tagOption) => tagOption.value
    );
    try {
      await createMessage(messageContent, selectedTagNames);
      addNewTagsToTagOptions();
      addTagOptionsToActives();
    } catch (error: any) {
      setError(error);
    } finally {
      setMessageContent("");
      setSelectedTagOptions([]);
    }
  };
  return (
    <form onSubmit={sendMessage} className="flex flex-col gap-4 items-start">
      <MyInput value={messageContent} setValue={setMessageContent} />
      <MyMultiSelect
        options={tagOptions}
        selectedOptions={selectedTagOptions}
        setSelectedOptions={setSelectedTagOptions}
      />
      <div className="flex gap-3">
        <button
          className="bg-[#d9d9d9] font-medium py-4 px-5 rounded-full"
          type="submit"
        >
          Send Message
        </button>
        <button
          className="bg-[#d9d9d9] font-medium py-4 px-5 rounded-full"
          type="button"
          onClick={() => setToggledTagPanel(true)}
        >
          Open Tags Panel
        </button>
      </div>
    </form>
  );
};

export default MessageSender;
