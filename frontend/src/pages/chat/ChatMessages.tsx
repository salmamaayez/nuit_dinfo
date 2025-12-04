import ChatItem from "../../components/chat/ChatItem";
import { Message } from "./types";

type Props = {
  messages: Message[];
  onRegenerate: (index: number) => void;
};

const ChatMessages = ({ messages, onRegenerate }: Props) => {
  return (
    <>
      {messages.map((chat, index) => (
        <ChatItem
          key={`${chat.content}${Math.random()}`}
          content={chat.content}
          role={chat.role}
          onRegenerate={
            chat.role === "assistant" ? () => onRegenerate(index) : undefined
          }
        />
      ))}
    </>
  );
};

export default ChatMessages;
