# #!/usr/bin/env python
# import os
# import sys

# # Ensure the project root is in the Python path.
# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

# from ai_viz.data_loader import load_data
# from ai_viz.core import visualize

# def main():
#     print("Welcome to AI-Viz Terminal Chat Interface")
#     print("Select an AI service:")
#     print("1. OpenAI")
#     print("2. Groq")
#     print("3. Ollama")
#     print("4. None (Proceed without AI)")
    
#     choice = input("Your choice (1/2/3/4): ").strip()
#     ai_service = None
    
#     if choice == "1":
#         ai_service = "openai"
#         api_key = input("Enter your OpenAI API key: ").strip()
#         model = input("Enter OpenAI model name (default: gpt-3.5-turbo): ").strip() or "gpt-3.5-turbo"
#         os.environ["OPENAI_API_KEY"] = api_key
#     elif choice == "2":
#         ai_service = "groq"
#         api_key = input("Enter your Groq API key: ").strip()
#         model = input("Enter Groq model name (default: groq-model): ").strip() or "groq-model"
#         os.environ["GROQ_API_KEY"] = api_key
#     elif choice == "3":
#         ai_service = "ollama"
#         model = input("Enter Ollama model name (default: your-model-name): ").strip() or "your-model-name"
#         os.environ["OLLAMA_MODEL"] = model
#     elif choice == "4":
#         print("Proceeding without an AI service.")
#     else:
#         print("Invalid choice. Exiting.")
#         return

#     file_path = input("Enter the file path to visualize: ").strip()
#     try:
#         data = load_data(file_path)
#         print("Data loaded successfully.")
#     except Exception as e:
#         print(f"Error loading data: {e}")
#         return

#     print("Enter your queries below. Type 'exit' to quit.")
#     while True:
#         prompt = input("Query> ").strip()
#         if prompt.lower() == "exit":
#             break

#         try:
#             # The prompt_template is set to the user's query.
#             result = visualize(data, ai_service=ai_service, prompt_template=prompt)
#             if ai_service:
#                 fig, suggestion = result
#                 print("\n--- AI Suggestion ---")
#                 print("Note: This suggestion may contain code or guidance to help generate or modify the plot.")
#                 print(suggestion)
#                 print("---------------------\n")
#             else:
#                 fig = result
#                 print("Visualization generated.")
            
#             output_file = "output.png"
#             fig.savefig(output_file)
#             print(f"Visualization saved as {output_file}\n")
#         except Exception as e:
#             print(f"Error during visualization: {e}\n")

# if __name__ == "__main__":
#     main()

#!/usr/bin/env python
import os
import sys
import subprocess

# Ensure the project root is in the Python path.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

from ai_viz.core import generate_visualization_script

def main():
    print("Welcome to AI-Viz Terminal Chat Interface")
    print("Select an AI service for code generation:")
    print("1. OpenAI")
    print("2. Groq")
    print("3. Ollama")
    print("4. None (Proceed without AI)")

    choice = input("Your choice (1/2/3/4): ").strip()
    ai_service = None

    if choice == "1":
        ai_service = "openai"
        api_key = input("Enter your OpenAI API key: ").strip()
        model = input("Enter OpenAI model name (default: gpt-3.5-turbo): ").strip() or "gpt-3.5-turbo"
        os.environ["OPENAI_API_KEY"] = api_key
    elif choice == "2":
        ai_service = "groq"
        api_key = input("Enter your Groq API key: ").strip()
        model = input("Enter Groq model name (default: groq-model): ").strip() or "groq-model"
        os.environ["GROQ_API_KEY"] = api_key
    elif choice == "3":
        ai_service = "ollama"
        model = input("Enter Ollama model name (default: your-model-name): ").strip() or "your-model-name"
        os.environ["OLLAMA_MODEL"] = model
    elif choice == "4":
        print("Proceeding without an AI service is not supported in code generation mode.")
        return
    else:
        print("Invalid choice. Exiting.")
        return

    file_path = input("Enter the file path to visualize: ").strip()
    if not os.path.isfile(file_path):
        print(f"Error: The file '{file_path}' does not exist.")
        return

    query = input("Enter your visualization request (e.g., 'Create a chart of trending songs over the months with most streams'): ").strip()
    if not query:
        print("No query provided. Exiting.")
        return

    try:
        output_script, code = generate_visualization_script(file_path, ai_service, query)
        print("\n--- Generated Python Script ---")
        print(code)
        print("-------------------------------\n")
        print(f"The generated script has been saved as '{output_script}' in the current directory.")
        
        run_choice = input("Do you want to execute the generated script now? (y/n): ").strip().lower()
        if run_choice == "y":
            print("Running the generated script...")
            subprocess.run(["python", output_script], check=True)
        else:
            print("You can run the generated script later using 'python generated_visualization.py'.")
    except Exception as e:
        print(f"Error during code generation: {e}")

if __name__ == "__main__":
    main()



# import os
# import sys
# import subprocess

# # Ensure the project root is in the Python path.
# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), ".")))

# from ai_viz.core import generate_visualization_script

# def main():
#     print("Welcome to AI-Viz Terminal Chat Interface")
#     print("Select an AI service for code generation:")
#     print("1. OpenAI")
#     print("2. Groq")
#     print("3. Ollama")
#     print("4. None (Proceed without AI)")

#     choice = input("Your choice (1/2/3/4): ").strip()
#     ai_service = None

#     if choice == "1":
#         ai_service = "openai"
#         api_key = input("Enter your OpenAI API key: ").strip()
#         model = input("Enter OpenAI model name (default: gpt-3.5-turbo): ").strip() or "gpt-3.5-turbo"
#         os.environ["OPENAI_API_KEY"] = api_key
#     elif choice == "2":
#         ai_service = "groq"
#         api_key = input("Enter your Groq API key: ").strip()
#         model = input("Enter Groq model name (default: groq-model): ").strip() or "groq-model"
#         os.environ["GROQ_API_KEY"] = api_key
#     elif choice == "3":
#         ai_service = "ollama"
#         model = input("Enter Ollama model name (default: your-model-name): ").strip() or "your-model-name"
#         os.environ["OLLAMA_MODEL"] = model
#     elif choice == "4":
#         print("Proceeding without an AI service is not supported in code generation mode.")
#         return
#     else:
#         print("Invalid choice. Exiting.")
#         return

#     file_path = input("Enter the file path to visualize: ").strip()
#     if not os.path.isfile(file_path):
#         print(f"Error: The file '{file_path}' does not exist.")
#         return

#     query = input("Enter your visualization request (e.g., 'Create a chart of trending songs over the months with most streams'): ").strip()
#     if not query:
#         print("No query provided. Exiting.")
#         return

#     try:
#         output_script, code = generate_visualization_script(file_path, ai_service, query)
#         print("\n--- Generated Python Script ---")
#         print(code)
#         print("-------------------------------\n")
#         print(f"The generated script has been saved as '{output_script}' in the current directory.")
        
#         run_choice = input("Do you want to execute the generated script now? (y/n): ").strip().lower()
#         if run_choice == "y":
#             print("Running the generated script...")
#             subprocess.run(["python", output_script], check=True)
#         else:
#             print("You can run the generated script later using 'python generated_visualization.py'.")
#     except Exception as e:
#         print(f"Error during code generation: {e}")

# if __name__ == "__main__":
#     main()
