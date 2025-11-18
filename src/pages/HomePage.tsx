import { useState } from 'react';
import { ChatInput } from '@/components/Chat/ChatInput';
import { ChatMessages } from '@/components/Chat/ChatMessages';
import { Message } from '@/components/Chat/ChatMessage';

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: 'Welcome to Sema Support! How can I assist you today?',
  },
];

export function HomePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Failed to get response from backend:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again later.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-[calc(100vh-4rem)]'>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}