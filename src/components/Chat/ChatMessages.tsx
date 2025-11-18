import { ChatMessage, Message } from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && (
        <div className='flex justify-start'>
          <div className='rounded-lg px-4 py-2 bg-muted text-muted-foreground'>
            <p className='text-sm'>Sema is thinking...</p>
          </div>
        </div>
      )}
    </div>
  );
}