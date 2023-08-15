import MessageSender from "@/components/Inputs/MessageSender";
import MessagePanel from "@/components/Messages/MessagePanel";
import TagPanel from "@/components/TagPanel/TagPanel";

export default function Home() {
  return (
    <main className="h-screen grid grid-rows-[1fr_15rem]">
      <TagPanel />
      <div className="p-5 overflow-y-auto">
        <MessagePanel />
      </div>
      <div className="border-t p-5">
        <MessageSender />
      </div>
    </main>
  );
}
