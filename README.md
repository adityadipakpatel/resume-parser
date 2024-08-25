# Resume Parser and LaTeX PDF Generator

## Overview

This project is a resume parser and LaTeX PDF generator. Users can input their resume details through a web interface in justa big textbox, which are then parsed using an LLM (Large Language Model) API. The parsed information is then used to edit one of the best rated latex resume template(Jake Ryan) to generate a PDF resume.

## Project Structure

- **backend/**
  - `latex-template/` - Contains the LaTeX template file.
  - `user_logs/` - Stores user input files and generated PDFs.
  - `text-to-latex.py` - Python script for generating LaTeX files and converting them to PDF.
- **frontend/**
  - `index.html` - The main HTML file for the web interface.
  - `index.js` - JavaScript file for handling user interactions and form submissions.
  - `style.css` - CSS file for styling the web interface.
  - `muoaimg.png` - Example image for the web interface.
- **users/** - Contains sample user input files for testing.
- **README.md** - This file.
- **requirements.txt** - Python package dependencies.
- **Resume.pdf** - Example output PDF file.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/adityadipakpatel/resume-parser
   cd resume-parser/
   ```

2. **Set Up Python Environment:**
   Ensure you have python3 installed. Create and activate a virtual environment, then install the dependencies:
   ```bash
   virtualenv -p python3 ./resume-parser 
   source ./resume-parser/bin/activate
   pip install -r requirements.txt
   ```

3. **Install TeX Live:**
   On macOS, install TeX Live using Homebrew:
   ```bash
   brew install --cask mactex
   ```

## Usage

1. **Run the Python Script:**
   - Place user input text files in the `./backend/user_logs/` directory.
   - Execute the script:
     ```bash
     python3 ./backend/text-to-latex.py
     ```
   - This will generate a `.tex` file and compile it to a `.pdf` using `pdflatex`.

2. **Web Interface:**
   - Open `frontend/index.html` in a web browser to access the form where users can input their information.
   - The form submits data to the backend for processing.

## API Integration

- **Local LLM API Server:**
  Ensure you have a local LLM API server running at `http://localhost:1234/v1` with the appropriate endpoint or you can change that in the `text-to-latex.py` file or entirely replace it with another API.

## Troubleshooting

- **pdflatex Command Not Found:**
  Ensure TeX Live is installed correctly and `pdflatex` is in your system `PATH`.

- **Errors During Execution:**
  Check the output logs for detailed error messages. Ensure all file paths and dependencies are correctly set up.

## Credits

- **Aditya Patel** - Team Lead
- **Jeel Shah**
- **Siddhant Goel**
- **Krish Rajani**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- **Jake Ryan** for the LaTeX template.
- **OpenAI** for providing the LLM API.
- **Mistral** for providing a local llm.
- **LM Studio** for providing a local llm running interface.
