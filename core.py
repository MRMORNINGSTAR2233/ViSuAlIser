import pandas as pd
import numpy as np
from PIL import Image
from ai_viz.data_loader import load_data
from ai_viz.visualizers import numeric, image, text
from ai_viz.llm_interfaces import openai_interface, groq_interface, ollama_interface

def visualize(data_source, ai_service=None, prompt_template=None, **kwargs):
    """
    Visualize a dataset from various input formats and optionally leverage an AI service
    to enhance the visualization based on client instructions.
    
    Parameters:
      - data_source: A file path or already loaded data (DataFrame, numpy array, PIL Image, or text).
      - ai_service (str): Choose an AI service ('openai', 'groq', 'ollama') to refine output.
      - prompt_template (str): A prompt to guide the AI service.
      - kwargs: Additional parameters passed to the visualizer functions.
    
    Returns:
      - A Matplotlib Figure object. If an AI service is used, returns a tuple (Figure, AI suggestion).
    """
    data = load_data(data_source)

    # Dispatch based on data type.
    if isinstance(data, (pd.DataFrame, np.ndarray)):
        fig = numeric.plot_tabular(data, **kwargs)
    elif isinstance(data, Image.Image):
        fig = image.plot_image(data, **kwargs)
    elif isinstance(data, str) or (isinstance(data, list) and all(isinstance(item, str) for item in data)):
        fig = text.plot_text(data, **kwargs)
    else:
        raise ValueError("Unsupported data type for visualization.")

    # If an AI service is requested.
    if ai_service:
        prompt = prompt_template or "Suggest improvements for this visualization."
        prompt += f"\nData type: {type(data).__name__}"
        ai_interface = None
        if ai_service.lower() == "openai":
            ai_interface = openai_interface.OpenAIInterface()
        elif ai_service.lower() == "groq":
            ai_interface = groq_interface.GroqInterface()
        elif ai_service.lower() == "ollama":
            ai_interface = ollama_interface.OllamaInterface()
        else:
            raise ValueError("Unsupported AI service. Use 'openai', 'groq', or 'ollama'.")
        
        ai_suggestion = ai_interface.query(prompt)
        return fig, ai_suggestion

    return fig
g 