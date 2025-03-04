# import pandas as pd
# import numpy as np
# from PIL import Image
# from ai_viz.data_loader import load_data
# from ai_viz.visualizers import numeric, image, text
# from ai_viz.llm_interfaces import openai_interface, groq_interface, ollama_interface

# def visualize(data_source, ai_service=None, prompt_template=None, **kwargs):
#     """
#     Visualize a dataset from various input formats and, optionally, leverage an AI service
#     to provide suggestions or code snippets for enhancing the visualization.
    
#     Parameters:
#       - data_source: A file path or already loaded data (DataFrame, numpy array, PIL Image, or text).
#       - ai_service (str): Choose an AI service ('openai', 'groq', 'ollama') to get text suggestions.
#       - prompt_template (str): A prompt to guide the AI service. For example:
#             "Create me a chart of trending songs over the months with most listened or streams."
#       - kwargs: Additional parameters passed to the visualizer functions.
    
#     Returns:
#       - If no AI service is used: a Matplotlib Figure object.
#       - If an AI service is used: a tuple (Figure, AI_suggestion_text).
      
#     Note:
#       Chat-based models cannot directly generate plots. Instead, they will provide guidance
#       or code suggestions (e.g., a Matplotlib code snippet) that you can use to refine or regenerate the plot.
#     """
#     data = load_data(data_source)

#     # Generate a base visualization based on data type.
#     if isinstance(data, (pd.DataFrame, np.ndarray)):
#         fig = numeric.plot_tabular(data, **kwargs)
#     elif isinstance(data, Image.Image):
#         fig = image.plot_image(data, **kwargs)
#     elif isinstance(data, str) or (isinstance(data, list) and all(isinstance(item, str) for item in data)):
#         fig = text.plot_text(data, **kwargs)
#     else:
#         raise ValueError("Unsupported data type for visualization.")

#     # If an AI service is requested, query it for suggestions.
#     if ai_service:
#         prompt = prompt_template or "Provide suggestions to improve this visualization."
#         prompt += f"\nData type: {type(data).__name__}"
#         ai_interface = None
#         if ai_service.lower() == "openai":
#             ai_interface = openai_interface.OpenAIInterface()
#         elif ai_service.lower() == "groq":
#             ai_interface = groq_interface.GroqInterface()
#         elif ai_service.lower() == "ollama":
#             ai_interface = ollama_interface.OllamaInterface()
#         else:
#             raise ValueError("Unsupported AI service. Use 'openai', 'groq', or 'ollama'.")
        
#         # Get the suggestion from the AI. The suggestion is text that may include a code snippet.
#         ai_suggestion = ai_interface.query(prompt)
#         return fig, ai_suggestion

#     return fig

import os
import pandas as pd

def generate_visualization_script(data_source, ai_service, prompt_template, **kwargs):
    """
    Generate a complete Python script that:
      1. Reads the provided data file.
      2. Analyzes the data (using a summary for supported file types).
      3. Creates a visualization as specified by the user's request.
      
    The generated script is saved to the current folder.

    Parameters:
      - data_source: The file path to the data.
      - ai_service (str): The chosen AI service ('openai', 'groq', or 'ollama').
      - prompt_template (str): The user's visualization request.
      - kwargs: Additional parameters (if needed).

    Returns:
      - output_script: The filename where the generated code is saved.
      - code: The Python code generated by the AI service.
    """
    # Determine file name and extension.
    if isinstance(data_source, str):
        filename = data_source
        ext = os.path.splitext(filename)[1].lower()
    else:
        filename = "data_file"
        ext = ""

    # Function to generate a data summary for CSV/Excel files.
    def generate_data_summary(filename, ext):
        summary = ""
        try:
            if ext in [".csv", ".tsv"]:
                try:
                    df = pd.read_csv(filename, nrows=5, encoding="utf-8")
                except Exception as e:
                    df = pd.read_csv(filename, nrows=5, encoding="latin1")
                summary += f"Shape: {df.shape}\n"
                summary += f"Columns: {list(df.columns)}\n"
                summary += "First 5 rows:\n" + df.head().to_string()
            elif ext in [".xls", ".xlsx"]:
                df = pd.read_excel(filename, nrows=5)
                summary += f"Shape: {df.shape}\n"
                summary += f"Columns: {list(df.columns)}\n"
                summary += "First 5 rows:\n" + df.head().to_string()
            else:
                summary = "No summary available for this file type."
        except Exception as e:
            summary = "Error generating summary: " + str(e)
        return summary

    # Generate a data summary if applicable.
    data_summary = ""
    if ext in [".csv", ".tsv", ".xls", ".xlsx"]:
        data_summary = generate_data_summary(filename, ext)
    else:
        data_summary = "Dataset summary not available for this file type."

    # Create a prompt instructing the AI to generate a full, self-contained Python script.
    prompt = f"""Generate a complete Python script that:
1. Reads the data file '{filename}'.
2. Processes the data appropriately based on its file type (extension: {ext}).
3. Creates a visualization according to the following requirements:
{prompt_template}

Dataset Summary:
{data_summary}

The script should be self-contained and use appropriate libraries (such as pandas and matplotlib).
When executed, it should generate and save the plot to a file (e.g., 'generated_plot.png').
Include error handling for CSV encoding issues (try UTF-8 first, then fallback to 'latin1' if necessary).
Include comments so that the code is easy to understand.
"""
    # Debug: Show the constructed prompt.
    print("\n--- Debug: Generated Prompt ---")
    print(prompt)
    print("-------------------------------\n")
    
    # Select the AI interface based on the chosen service.
    ai_interface = None
    if ai_service.lower() == "openai":
        from ai_viz.llm_interfaces.openai_interface import OpenAIInterface
        ai_interface = OpenAIInterface()
    elif ai_service.lower() == "groq":
        from ai_viz.llm_interfaces.groq_interface import GroqInterface
        ai_interface = GroqInterface()
    elif ai_service.lower() == "ollama":
        from ai_viz.llm_interfaces.ollama_interface import OllamaInterface
        ai_interface = OllamaInterface()
    else:
        raise ValueError("Unsupported AI service. Use 'openai', 'groq', or 'ollama'.")
    
    # Query the AI service for the code.
    code = ai_interface.query(prompt)
    
    # Debug: Check the returned code.
    print("\n--- Debug: AI Returned Code ---")
    print(code if code else "No code returned by the AI service!")
    print("-------------------------------\n")
    
    # Fallback: If no code is returned, use a default code snippet that handles CSV encoding issues.
    if not code.strip():
        code = f"""# Fallback visualization script
import pandas as pd
import matplotlib.pyplot as plt

def read_csv_with_fallback(filename):
    try:
        return pd.read_csv(filename, encoding='utf-8')
    except UnicodeDecodeError:
        print("UTF-8 decoding failed, trying 'latin1' encoding.")
        return pd.read_csv(filename, encoding='latin1')

# Read the data using the fallback function
data = read_csv_with_fallback('{filename}')

# Create a simple plot using the first column as an example
plt.figure(figsize=(10, 6))
plt.plot(data.index, data.iloc[:, 0], label=data.columns[0])
plt.xlabel('Index')
plt.ylabel(data.columns[0])
plt.title('Fallback Visualization')
plt.legend()
plt.savefig('generated_plot.png')
print('Fallback plot generated and saved as generated_plot.png')
"""
    # Save the generated code to a Python file.
    output_script = "generated_visualization.py"
    with open(output_script, "w") as f:
        f.write(code)
    
    return output_script, code


# import os
# import pandas as pd

# def generate_visualization_script(data_source, ai_service, prompt_template, **kwargs):
#     """
#     Generate a complete Python script that:
#       1. Reads the provided data file.
#       2. Analyzes the data (using a summary for supported file types).
#       3. Creates a visualization as specified by the user's request.
      
#     The generated script is saved to the current folder.

#     Parameters:
#       - data_source: The file path to the data.
#       - ai_service (str): The chosen AI service ('openai', 'groq', or 'ollama').
#       - prompt_template (str): The user's visualization request.
#       - kwargs: Additional parameters (if needed).

#     Returns:
#       - output_script: The filename where the generated code is saved.
#       - code: The Python code generated by the AI service.
#     """
#     # Determine file name and extension.
#     if isinstance(data_source, str):
#         filename = data_source
#         ext = os.path.splitext(filename)[1].lower()
#     else:
#         filename = "data_file"
#         ext = ""

#     # Generate a data summary for supported file types.
#     def generate_data_summary(filename, ext):
#         summary = ""
#         try:
#             if ext in [".csv", ".tsv"]:
#                 try:
#                     df = pd.read_csv(filename, nrows=5, encoding="utf-8")
#                 except Exception:
#                     df = pd.read_csv(filename, nrows=5, encoding="latin1")
#                 summary += f"Shape: {df.shape}\n"
#                 summary += f"Columns: {list(df.columns)}\n"
#                 summary += "First 5 rows:\n" + df.head().to_string()
#             elif ext in [".xls", ".xlsx"]:
#                 df = pd.read_excel(filename, nrows=5)
#                 summary += f"Shape: {df.shape}\n"
#                 summary += f"Columns: {list(df.columns)}\n"
#                 summary += "First 5 rows:\n" + df.head().to_string()
#             else:
#                 summary = "No summary available for this file type."
#         except Exception as e:
#             summary = "Error generating summary: " + str(e)
#         return summary

#     # Generate a data summary if applicable.
#     data_summary = ""
#     if ext in [".csv", ".tsv", ".xls", ".xlsx"]:
#         data_summary = generate_data_summary(filename, ext)
#     else:
#         data_summary = "Dataset summary not available for this file type."

#     # Create a prompt instructing the AI to generate a full, self-contained Python script.
#     prompt = f"""Generate a complete Python script that:
# 1. Reads the data file '{filename}'.
# 2. Processes the data appropriately based on its file type (extension: {ext}).
# 3. Creates a visualization according to the following requirements:
# {prompt_template}

# Dataset Summary:
# {data_summary}

# The script should be self-contained and use appropriate libraries (such as pandas and matplotlib).
# When executed, it should generate and save the plot to a file (e.g., 'generated_plot.png').
# Include error handling for CSV encoding issues (try UTF-8 first, then fallback to 'latin1' if necessary).
# Include comments so that the code is easy to understand.
# """
#     # Debug: Show the constructed prompt.
#     print("\n--- Debug: Generated Prompt ---")
#     print(prompt)
#     print("-------------------------------\n")
    
#     # Select the AI interface based on the chosen service.
#     ai_interface = None
#     if ai_service.lower() == "openai":
#         from ai_viz.llm_interfaces.openai_interface import OpenAIInterface
#         ai_interface = OpenAIInterface()
#     elif ai_service.lower() == "groq":
#         from ai_viz.llm_interfaces.groq_interface import GroqInterface
#         ai_interface = GroqInterface()
#     elif ai_service.lower() == "ollama":
#         from ai_viz.llm_interfaces.ollama_interface import OllamaInterface
#         ai_interface = OllamaInterface()
#     else:
#         raise ValueError("Unsupported AI service. Use 'openai', 'groq', or 'ollama'.")
    
#     # Query the AI service for the code.
#     code = ai_interface.query(prompt)
    
#     # Debug: Check the returned code.
#     print("\n--- Debug: AI Returned Code ---")
#     print(code if code else "No code returned by the AI service!")
#     print("-------------------------------\n")
    
#     # If no code is returned, write a comment indicating the issue.
#     if not code.strip():
#         code = "# No code generated by the AI service. Please try refining your prompt."

#     # Save the generated code to a Python file.
#     output_script = "generated_visualization.py"
#     with open(output_script, "w") as f:
#         f.write(code)
    
#     return output_script, code
