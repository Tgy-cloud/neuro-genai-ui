import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Source = {
  content: string;
  score: number;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
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
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className='mt-2 pt-2 border-t border-muted-foreground/20'>
            <h4 className='text-xs font-semibold mb-1'>Sources:</h4>
            <div className='space-y-2'>
              {message.sources.map((source, i) => (
                <div key={i} className='p-2 bg-background/50 rounded-lg'>
                  <p className='text-xs text-muted-foreground/80 truncate'>
                    {source.content}
                  </p>
                  <p className='text-xs font-bold text-primary'>
                    Relevance: {(source.score * 100).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <div className='flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center'>
          <User className='w-5 h-5' />
        </div>
      )}
    </div>
  );
}