import { ChatMessage, Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}
