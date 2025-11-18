import { Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 bg-background border-t flex items-center gap-4'
    >
      <Button variant='ghost' size='icon' type='button'>
        <Paperclip className='w-5 h-5' />
      </Button>
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Type your message here...'
        className='flex-1 resize-none'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button type='submit' disabled={!message.trim()}>
        <Send className='w-5 h-5' />
      </Button>
    </form>
  );
}
