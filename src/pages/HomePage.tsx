import { useState } from 'react';
import { Upload, MessageSquare, Send, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

const HomePage = () => {
  const [fileName, setFileName] = useState('');
  const [messages, setMessages] = useState<{
    text: string;
    isUser: boolean;
  }[]>([]);
  const [input, setInput] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      toast.success(`File '${file.name}' uploaded successfully!`);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'This is a placeholder response from the AI.', isUser: false }]);
    }, 1000);
  };

  return (
    <div className='flex flex-col h-[calc(100vh-120px)]'>
      <div className='flex-grow overflow-y-auto p-6 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner'>
        {messages.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400'>
            <MessageSquare className='w-16 h-16 mb-4' />
            <h2 className='text-2xl font-semibold'>Welcome to Soma AI</h2>
            <p>Upload a document and start asking questions.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg max-w-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
      <div className='mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
        <div className='flex items-center space-x-4'>
          <label htmlFor='file-upload' className='cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600'>
            <Upload className='w-5 h-5' />
            <span>{fileName || 'Upload Document'}</span>
            <input id='file-upload' type='file' className='hidden' onChange={handleFileChange} accept='.pdf,.txt' />
          </label>

          <div className='flex-grow flex items-center border border-gray-300 dark:border-gray-600 rounded-lg'>
             <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder='Ask a question about the document...'
              className='w-full p-2 bg-transparent focus:outline-none'
            />
            <button onClick={handleSendMessage} className='p-2 text-gray-500 hover:text-blue-500'>
              <Send className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
