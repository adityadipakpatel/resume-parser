from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

# Initialize history with a placeholder for user input
history = [
    {"role": "system", "content": "You are an intelligent assistant who helps by taking a paragraph of text from the user along with Jake Ryan's template that is already on the system and editing the template accordingly. Provide a .tex file that is tailored to the user's information. Always provide well-reasoned answers that are both correct and helpful."},
]

# Replace this with your user input (e.g., from a form or another source)
user_input = "Your input text here"
#####
# REPLACE THIS AND LINK AND MAKE THIS DYNAMIC
#####

# Update history with the new user input
history.append({"role": "user", "content": user_input})

# Make API call
try:
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

    # Save the response to a .tex file
    try:
        with open("output.tex", "w") as file:
            file.write(new_message["content"])
        print("File saved successfully.")
    except Exception as e:
        print(f"There was an error: {e}")

except Exception as e:
    print(f"There was an error with the API call: {e}")
