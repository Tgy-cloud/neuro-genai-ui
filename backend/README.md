# Sema Support Copilot - Backend

This is the backend for the Sema Support Copilot, a RAG (Retrieval-Augmented Generation) system built with FastAPI and LangChain.

## Setup

1.  **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

2.  **Set up Environment Variables:**

    Create a `.env` file in the `backend` directory by copying the `.env.example` file:

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and add your Hugging Face API token. You can get one from the [Hugging Face website](https://huggingface.co/settings/tokens).

    ```
    HUGGINGFACEHUB_API_TOKEN="your_token_here"
    ```

3.  **Run the Application:**

    ```bash
    uvicorn main:app --reload
    ```

    The API will be available at `http://localhost:8000`.

## API Endpoint

-   **POST /api/chat**

    This endpoint accepts a JSON payload with a `query` field and returns a JSON response with the answer and the retrieved source documents.

    **Request:**

    ```json
    {
        "query": "What is Sema?"
    }
    ```

    **Response:**

    ```json
    {
        "answer": "Sema is a platform designed to help African businesses...",
        "sources": [
            {
                "content": "What is Sema? Sema is a platform...",
                "score": 0.98
            }
        ]
    }
    ```
