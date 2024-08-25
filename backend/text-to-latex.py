import os
import shutil
from datetime import datetime
from subprocess import run
import requests

# ARLI API configuration
api_endpoint = "https://api.arli.com/v1/models/mistral-nemo-12b-instruct-2407/completions"
api_key = "your_api_key_here"  # Replace with your actual ARLI API key

# Initialize history with a placeholder for user input
history = [
    {"role": "system", "content": "You are an intelligent assistant who helps by taking a paragraph of text from the user along with Jake Ryan's template that is already on the system and editing the template accordingly. Provide a .tex file that is tailored to the user's information by merging the input text into the template, keeping the overall structure intact. Always provide well-reasoned answers that are both correct and helpful."},
]

# Read user input from a .txt file inside the user_logs folder
user_logs_folder = "./user_logs"
user_input_file = os.path.join(user_logs_folder, "sample2.txt")

with open(user_input_file, "r") as file:
    user_input = file.read().strip()

# Update history with the new user input
history.append({"role": "user", "content": user_input})

# Generate a folder name with the current time
current_time = datetime.now().strftime("%Y_%m_%d_%H_%M_%S")
output_folder = os.path.join(user_logs_folder, current_time)

try:
    # Create the new folder in backend/user_logs/
    os.makedirs(output_folder)

    # Path to Jake Ryan's LaTeX template
    template_file = os.path.join(".", "latex-template", "jake-ryan-template.tex")

    # New file name for the copied template (matches folder name)
    copied_template = os.path.join(output_folder, f"{current_time}.tex")

    # Copy the template to the new folder and rename it
    shutil.copy(template_file, copied_template)

    # Prepare data for the API call
    data = {
        "prompt": f"The LaTeX template is located at: {copied_template}. Please merge the user's information into this template and ensure that the final document maintains the template's structure.",
        "max_tokens": 1000,  # Adjust based on your needs
        "temperature": 0.7,
        "top_p": 1.0
    }

    # Make the ARLI API call
    response = requests.post(api_endpoint, headers={"Authorization": f"Bearer {api_key}"}, json=data)

    if response.status_code == 200:
        completion = response.json()
        generated_content = completion['choices'][0]['text']
        new_message = {"role": "assistant", "content": generated_content}
    else:
        print(f"Error: {response.status_code} - {response.text}")
        raise Exception("Failed to get a response from ARLI API")

    # Save the response to the .tex file in the new folder
    try:
        with open(copied_template, "w") as file:
            file.write(new_message["content"])
        print(f"File saved successfully at {copied_template}.")
    except Exception as e:
        print(f"There was an error saving the file: {e}")

    # Run pdflatex using BasicTeX to convert the .tex file to a .pdf
    try:
        print("Running pdflatex...")
        pdflatex_path = "/Library/TeX/texbin/pdflatex"  # Update this if the path differs
        result = run([pdflatex_path, "-output-directory", output_folder, copied_template], capture_output=True, text=True)

        if result.returncode == 0:
            print(f"PDF generated successfully in {output_folder}.")
        else:
            print(f"pdflatex encountered an error:\n{result.stderr}")

    except Exception as e:
        print(f"There was an error running pdflatex: {e}")

    # Alternatively, use the online API to generate the PDF
    try:
        print("Generating PDF using the online API...")
        curl_command = f"curl -F \"file=@{copied_template}\" https://latexonline.cc/compile -o {output_folder}/output.pdf"
        result = run(curl_command, shell=True, capture_output=True, text=True)
        
        if result.returncode == 0:
            print(f"PDF generated successfully using the online API in {output_folder}.")
        else:
            print(f"Online API encountered an error:\n{result.stderr}")

    except Exception as e:
        print(f"There was an error using the online API: {e}")

except Exception as e:
    print(f"There was an error with the API call or file operations: {e}")
