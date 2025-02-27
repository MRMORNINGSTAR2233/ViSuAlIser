import requests
from ai_viz.config import OLLAMA_HOST, OLLAMA_MODEL

class OllamaInterface:
    def __init__(self, host=None, model=None):
        self.host = host or OLLAMA_HOST
        self.model = model or OLLAMA_MODEL

    def query(self, prompt, **kwargs):
        endpoint = f"http://localhost:11434/api/chat"
        payload = {
            "model": self.model,
            "prompt": prompt,
            **kwargs,
        }
        response = requests.post(endpoint, json=payload)
        response.raise_for_status()
        data = response.json()
        return data.get("completion", "")
