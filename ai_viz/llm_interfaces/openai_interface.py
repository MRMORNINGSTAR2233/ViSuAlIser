import requests
from ai_viz.config import OPENAI_API_KEY

class OpenAIInterface:
    def __init__(self, api_key=None):
        self.api_key = api_key or OPENAI_API_KEY
        if not self.api_key:
            raise ValueError("OpenAI API key is required.")

    def query(self, prompt, model="gpt-3.5-turbo", **kwargs):
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": model,
            "messages": [{"role": "user", "content": prompt}],
            **kwargs,
        }
        response = requests.post("https://api.openai.com/v1/chat/completions",
                                 headers=headers,
                                 json=payload)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
