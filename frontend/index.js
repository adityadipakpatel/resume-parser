async function generateResume() {
    const { PDFDocument, rgb } = PDFLib;
    const text = document.getElementById('resumeInput').value;
    
    if (!text) {
        alert('Please enter some text before generating the resume.');
        return;
    }

    // Fetch and load the template PDF
    const response = await fetch('Resume.pdf');
    const templateBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Add a page and modify it
    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();

    page.drawText(text, {
        x: 50,
        y: height - 150, // Adjust the position as needed
        size: 12,
        color: rgb(0, 0, 0),
    });

    // Serialize the PDF document to bytes
    const pdfBytes = await pdfDoc.save();
    
    // Create a blob URL for the generated PDF
    const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    
    document.getElementById('resumePdf').src = pdfUrl;
    document.getElementById('pdfContainer').style.display = 'block';
}

function downloadResume() {
    const pdfUrl = document.getElementById('resumePdf').src;
    
    if (!pdfUrl) {
        alert('No resume generated yet.');
        return;
    }

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'resume.pdf';
    link.click();
}
