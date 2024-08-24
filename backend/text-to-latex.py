
# Chat with an intelligent assistant in your terminal
from openai import OpenAI

# Point to the local server
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

history = [
    {"role": "system", "content": "You are an intelligent assistant who helps by taking a paragraph of text from user along with jake ryan's template that is already on system and edit the template accordingly and give one .tex file which is tailored to the user's information. You always provide well-reasoned answers that are both correct and helpful."},
    {"role": "user", "content": f"aditya
worked at amazon for 4 years from jan 2017 to 2021
studied at dps in india
"},
]

# IMPORTANT:
# change line 10 with user's text




while True:
    completion = client.chat.completions.create(
        model="TheBloke/airoboros-mistral2.2-7B-GGUF",
        messages=history,
        temperature=0.7,
        stream=True,
    )

    new_message = {"role": "assistant", "content": ""}
    
    for chunk in completion:
        if chunk.choices[0].delta.content:
            print(chunk.choices[0].delta.content, end="", flush=True)
            new_message["content"] += chunk.choices[0].delta.content

    history.append(new_message)
    
    # Uncomment to see chat history
    # import json
    # gray_color = "\033[90m"
    # reset_color = "\033[0m"
    # print(f"{gray_color}\n{'-'*20} History dump {'-'*20}\n")
    # print(json.dumps(history, indent=2))
    # print(f"\n{'-'*55}\n{reset_color}")

    print()
    history.append({"role": "user", "content": input("> ")})

