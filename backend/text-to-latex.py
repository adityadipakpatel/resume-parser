# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="nvidia/Mistral-NeMo-Minitron-8B-Base")

# Load model directly
from transformers import AutoTokenizer, AutoModelForCausalLM

tokenizer = AutoTokenizer.from_pretrained("nvidia/Mistral-NeMo-Minitron-8B-Base")
model = AutoModelForCausalLM.from_pretrained("nvidia/Mistral-NeMo-Minitron-8B-Base")


