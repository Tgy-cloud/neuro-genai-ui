import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-4', isUser && 'justify-end')}>
      {!isUser && (
        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
          <Bot className='w-5 h-5' />
        </div>
      )}
      <div
        className={cn(
          'rounded-lg px-4 py-2 max-w-[80%]',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        )}
      >
        <p className='text-sm'>{message.content}</p>
      </div>
      {isUser && (
        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
          <User className='w-5 h-5' />
        </div>
      )}
    </div>
  );
}
