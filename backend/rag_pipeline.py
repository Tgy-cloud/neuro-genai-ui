from langchain_community.document_loaders import PythonLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_huggingface import HuggingFaceEndpoint
import os
from dotenv import load_dotenv
from data import faqs
from langchain.docstore.document import Document

load_dotenv()

def create_rag_pipeline():
    # Convert faqs to Document objects
    documents = [Document(page_content=f"Question: {faq['question']}\nAnswer: {faq['answer']}") for faq in faqs]

    # Initialize embeddings
    embeddings = HuggingFaceEmbeddings(model_name=\"all-MiniLM-L6-v2\")

    # Create FAISS vector store
    vectorstore = FAISS.from_documents(documents, embeddings)

    # Create retriever
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3, 'search_type': 'similarity_score_threshold', 'score_threshold': 0.7})

    # Define prompt template
    template = '''
    You are a helpful and friendly AI assistant for Sema, an African SaaS company.
    Answer the question based only on the following context:
    {context}

    Question: {question}

    If the answer is not in the context, say that you don't have enough information to answer.
    '''
    prompt = PromptTemplate.from_template(template)

    # Initialize LLM
    llm = HuggingFaceEndpoint(
        repo_id="mistralai/Mixtral-8x7B-Instruct-v0.1",
        temperature=0.1,
        max_new_tokens=256,
        huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_TOKEN"),
    )

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    # Create RAG chain
    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

    return rag_chain, retriever
