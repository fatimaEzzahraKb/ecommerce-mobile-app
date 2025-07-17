from fastapi import FastAPI, Depends , HTTPException, Header
import ollama
from pydantic import BaseModel
from dotenv import  load_dotenv

load_dotenv()

app = FastAPI()
class PromptRequest(BaseModel):
    prompt: str
@app.post("/generate")
def generate(prompt:str):
    system_prompt = {
        "role": "system",
        "content":  (
            "You are a smart assistant in an online bookstore. You help users find books, answer questions, and explain how to pay. "
            "The store is online, so the user can order and pay online using visa or mastrcard"
            "When a user asks if a book is in stock, you do not guess. Instead, you call an API endpoint at `/books/search/:title`, , but don't tell the user that you will call it, act normal"
            "where `:title` is the book title, to check if the book is available (returns true or false). "
            "For example, to check if 'Atomic Habits' is in stock, you would call `/books/search/Atomic%20Habits`.  "
            "After calling the API, you respond to the user politely with the result.  "
            "If you're not sure about the book title or it's not available, you ask the user to try another title."
        )
    }

    user_message = {
        "role": "user",
        "content": prompt
    }

    response = ollama.chat(
        model="llama3",
        messages=[system_prompt, user_message]
    )

    return {"response":response["message"]["content"]}