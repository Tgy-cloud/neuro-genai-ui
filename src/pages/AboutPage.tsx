const AboutPage = () => {
  return (
    <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800 dark:text-white'>About Soma AI</h1>
      <p className='text-gray-600 dark:text-gray-300 mb-4'>
        Soma AI is an educational tool designed to help users understand complex documents faster. 
        Powered by Retrieval-Augmented Generation (RAG), you can upload a document and ask questions 
        directly related to its content. This allows for a more interactive and efficient learning experience.
      </p>
      <h2 className='text-2xl font-semibold mb-2 text-gray-800 dark:text-white'>How it Works</h2>
      <ol className='list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2'>
        <li><strong>Upload a Document:</strong> Start by uploading a PDF or a text file.</li>
        <li><strong>Ask Questions:</strong> Type your questions into the chat interface.</li>
        <li><strong>Get Answers:</strong> The AI will analyze the document and provide answers based on the information it contains.</li>
      </ol>
      <p className='mt-6 text-sm text-gray-500 dark:text-gray-400'>
        This application was built for the NeuroStack Developer Internship Hackathon.
      </p>
    </div>
  );
};

export default AboutPage;
