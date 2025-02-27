import requests
from ai_viz.config import GROQ_API_KEY

class GroqInterface:
    def __init__(self, api_key=None):
        self.api_key = api_key or GROQ_API_KEY
        if not self.api_key:
            raise ValueError("Groq API key is required.")

    def query(self, prompt, model="groq-model", **kwargs):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": model,
            "prompt": prompt,
            **kwargs,
        }
        # Replace with the actual Groq endpoint.
        response = requests.post("https://api.groq.example/v1/complete",
                                 headers=headers,
                                 json=payload)
        response.raise_for_status()
        data = response.json()
        return data.get("completion", "")
