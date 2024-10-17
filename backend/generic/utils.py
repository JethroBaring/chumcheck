import json
import logging
import os
import secrets
import string

import google.generativeai as genai

from backend.settings import GEMINI_KEY

MAX_RETRIES = 3


def generate_random_password(length=12):
    characters = string.ascii_letters + string.digits + string.punctuation

    password = "".join(secrets.choice(characters) for _ in range(length))

    return password


def call_gemini_api(prompt, history=[]):
    retry = 0
    explanation = None

    while retry < MAX_RETRIES:
        try:
            genai.configure(api_key=GEMINI_KEY)
            generation_config = {
                "temperature": 1,
                "top_p": 0.95,
                "top_k": 64,
                "max_output_tokens": 8192,
                "response_mime_type": "text/plain",
            }
            safety_settings = [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
                },
            ]

            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash-latest",
                safety_settings=safety_settings,
                generation_config=generation_config,
            )
            chat_session = model.start_chat(history=history)

            chat_response = chat_session.send_message(prompt)

            explanation = json.loads(
                chat_response.text.replace("```json", "").replace("```", "").strip()
            )

            break
        except Exception as e:
            logging.error(f"An error occured in making gpt response(): {str(e)}")
            retry += 1

    return explanation, history
