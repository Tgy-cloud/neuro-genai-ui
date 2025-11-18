import { useState } from 'react';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ChatMessages } from '@/components/Chat/ChatMessages';
import { Message } from '@/components/Chat/ChatMessage';

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Hello! How can I help you today?',
  },
  {
    role: 'user',
    content: 'I need help with my document.',
  },
];

export function HomePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        role: 'assistant',
        content: 'I am ready to assist with your document. Please upload it.',
      };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    }, 1000);
  };

  return (
    <div className='flex flex-col h-[calc(100vh-4rem)]'>
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
