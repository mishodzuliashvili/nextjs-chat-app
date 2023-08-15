"use client";
import Avatar from "boring-avatars";

const Message = ({ message }: { message: Message }) => {
  return (
    <div>
      <div className="flex gap-3 items-center bg-[#ebebeb] p-3 rounded-full">
        <Avatar
          size={40}
          name={message.id}
          variant="bauhaus"
          colors={["#49007E", "#FF005B", "#FF7D10", "#FFB238"]}
        />
        <div className="">{message.content}</div>
      </div>
      <div className="flex gap-1 flex-wrap pt-3">
        {message.tags.map((tag) => (
          <span
            className="bg-[#ebebeb] font-medium border rounded-full py-1 px-3 "
            key={tag.id}
          >
            {tag.tagName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Message;
