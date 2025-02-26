#!/usr/bin/env python
import os
from ai_viz.data_loader import load_data
from ai_viz.core import visualize

def main():
    print("Welcome to AI-Viz Terminal Chat Interface")
    print("Select an AI service:")
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
        # Optionally, you can store the model name somewhere if needed.
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
        print("Proceeding without an AI service.")
    else:
        print("Invalid choice. Exiting.")
        return

    file_path = input("Enter the file path to visualize: ").strip()
    try:
        data = load_data(file_path)
        print("Data loaded successfully.")
    except Exception as e:
        print(f"Error loading data: {e}")
        return

    print("Enter your queries below. Type 'exit' to quit.")
    while True:
        prompt = input("Query> ").strip()
        if prompt.lower() == "exit":
            break

        try:
            # The prompt_template is set to the user's query.
            result = visualize(data, ai_service=ai_service, prompt_template=prompt)
            if ai_service:
                fig, suggestion = result
                print("\n--- AI Suggestion ---")
                print(suggestion)
                print("---------------------\n")
            else:
                fig = result
                print("Visualization generated.")
            
            output_file = "output.png"
            fig.savefig(output_file)
            print(f"Visualization saved as {output_file}\n")
        except Exception as e:
            print(f"Error during visualization: {e}\n")

if __name__ == "__main__":
    main()
