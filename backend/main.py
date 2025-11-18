from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag_pipeline import create_rag_pipeline
from typing import List

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG pipeline on startup
rag_chain, retriever = create_rag_pipeline()

class ChatRequest(BaseModel):
    query: str

class Source(BaseModel):
    content: str
    score: float

class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Get retrieved documents with scores
    retrieved_docs = retriever.similarity_search_with_relevance_scores(request.query)
    
    # Get answer from RAG chain
    answer = rag_chain.invoke(request.query)

    # Prepare sources for the response
    sources = [
        Source(content=doc.page_content, score=score)
        for doc, score in retrieved_docs
    ]

    return ChatResponse(answer=answer, sources=sources)

@app.get("/")
def read_root():
    return {"message": "Sema Support Copilot API is running."}
