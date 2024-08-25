import os
import shutil
from datetime import datetime
from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

# Initialize history with a placeholder for user input
history = [
    {"role": "system", "content": "You are an intelligent assistant who helps by taking a paragraph of text from the user along with Jake Ryan's template that is already on the system and editing the template accordingly. Provide a .tex file that is tailored to the user's information by merging the input text into the template, keeping the overall structure intact. Always provide well-reasoned answers that are both correct and helpful."},
]

# Read user input from a .txt file inside the user_logs folder
user_logs_folder = "./user_logs"
user_input_file = os.path.join(user_logs_folder, "sample1.txt")

with open(user_input_file, "r") as file:
    user_input = file.read().strip()

# Update history with the new user input
history.append({"role": "user", "content": user_input})

# Generate a folder name with the current time
current_time = datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
output_folder = os.path.join(user_logs_folder, current_time)

try:
    # Create the new folder
    os.makedirs(output_folder)

    # Path to Jake Ryan's LaTeX template
    template_file = os.path.join(".", "latex-template", "jake-ryan-template.tex")

    # New file name for the copied template (matches folder name)
    copied_template = os.path.join(output_folder, f"{current_time}.tex")

    # Copy the template to the new folder and rename it
    shutil.copy(template_file, copied_template)

    # Modify the LLM prompt to include the path of the copied template
    history.append({
        "role": "user",
        "content": (
            f"Please edit the LaTeX template located at: {copied_template}. "
            "The template contains a predefined structure for a resume. "
            "Ensure that the LaTeX file starts with `\\documentclass{{}}`, followed by `\\begin{{document}}` and ends with `\\end{{document}}`. "
            "Incorporate the user's information into this template while preserving its layout and formatting. "
            "Ensure that all necessary LaTeX commands and packages are included in the output, and check that any required class files, like `resume-template.cls`, are accessible. "
            "If additional class files or packages are required, include instructions or provide them."
        )
    })

    # Make the API call
    completion = client.chat.completions.create(
        model="TheBloke/airoboros-mistral2.2-7B-GGUF",
        messages=history,
        temperature=0.7,
        stream=True,
    )

    # Process the response
    new_message = {"role": "assistant", "content": ""}
    
    for chunk in completion:
        if chunk.choices[0].delta.content:
            new_message["content"] += chunk.choices[0].delta.content

    # Save the response to the .tex file in the new folder
    try:
        with open(copied_template, "w") as file:
            file.write(new_message["content"])
        print(f"File saved successfully at {copied_template}.")
    except Exception as e:
        print(f"There was an error saving the file: {e}")

    # Run pdflatex using a hardcoded bash command
    try:
        print("Running pdflatex...")
        command = f"pdflatex -output-directory {output_folder} {copied_template}"
        exit_code = os.system(command)
        
        if exit_code == 0:
            print(f"PDF generated successfully in {output_folder}.")
        else:
            print(f"pdflatex encountered an error with exit code {exit_code}.")

    except Exception as e:
        print(f"There was an error running pdflatex: {e}")

except Exception as e:
    print(f"There was an error with the API call or file operations: {e}")
