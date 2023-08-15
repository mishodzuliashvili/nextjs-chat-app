"use client";
import MainError from "@/components/Main/MainError";
import MainLoader from "@/components/Main/MainLoader";
import { fetchMessages } from "@/utils/messages";
import subscribeAbly from "@/utils/subscribeAbly";
import { fetchTags } from "@/utils/tags";
import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "use-local-storage";

const MainContext = createContext(
  {} as {
    messages: Message[];
    setMessages: Dispatch<React.SetStateAction<Message[]>>;
    tagOptions: TagOption[];
    setTagOptions: Dispatch<React.SetStateAction<TagOption[]>>;
    error: MyError | null;
    setError: Dispatch<React.SetStateAction<MyError | null>>;
    activeTagOptions: TagOption[];
    setActiveTagOptions: Dispatch<React.SetStateAction<TagOption[]>>;
    toggledTagPanel: boolean;
    setToggledTagPanel: Dispatch<React.SetStateAction<boolean>>;
  }
);

export function MainProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<MyError | null>(null);
  const [activeTagOptions, setActiveTagOptions] = useLocalStorage<TagOption[]>(
    "activeTagOptions",
    []
  ) as [TagOption[], Dispatch<React.SetStateAction<TagOption[]>>];
  const [toggledTagPanel, setToggledTagPanel] = useState<boolean>(false);

  const subscribeAblyCallback = (message: Message) => {
    setMessages((oldMessages) => [...oldMessages, message]);
  };

  const setInitialTags = async () => {
    try {
      const tags = await fetchTags();
      setTagOptions(
        tags.map((tag) => ({ value: tag.tagName, label: tag.tagName }))
      );
    } catch (error: any) {
      setError({
        message: error.message,
      });
    }
  };

  const setInitialMessages = async () => {
    try {
      const messages = await fetchMessages();
      setMessages(messages);
    } catch (error: any) {
      setError({
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInitialTags();
    setInitialMessages();
    subscribeAbly(subscribeAblyCallback);
  }, []);

  return (
    <MainContext.Provider
      value={{
        messages,
        setMessages,
        tagOptions: tagOptions,
        setTagOptions,
        error,
        setError,
        activeTagOptions,
        setActiveTagOptions,
        toggledTagPanel,
        setToggledTagPanel,
      }}
    >
      {loading && <MainLoader />}
      {!loading && error && <MainError error={error} />}
      {!loading && !error && <div>{children}</div>}
    </MainContext.Provider>
  );
}

export function useMain() {
  return useContext(MainContext);
}
