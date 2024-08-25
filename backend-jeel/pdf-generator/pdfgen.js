const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

// Function to create a PDF stream
function createPdfStream(data) {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    // Add content to the PDF
    doc.fontSize(25).text(`Hello, ${data.name}!`, 100, 100);
    doc.fontSize(12).text('This PDF is generated using PDFKit.', 100, 150);

    doc.end();

    return stream;
}

module.exports = { createPdfStream };


/*
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

// Function to create a PDF stream with detailed resume information
function createPdfStream(data) {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    // Add personal information
    doc.fontSize(20).text(`${data.name}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.moveDown();

    // Add skills section
    doc.fontSize(16).text('Skills', { underline: true });
    data.skills.forEach(skill => {
        doc.fontSize(12).text(`- ${skill}`);
    });
    doc.moveDown();

    // Add experience section
    doc.fontSize(16).text('Experience', { underline: true });
    data.experience.forEach(job => {
        doc.fontSize(14).text(job.position);
        doc.fontSize(12).text(`${job.company} - ${job.duration}`);
        doc.text(`${job.description}`);
        doc.moveDown();
    });

    // Add education section
    doc.fontSize(16).text('Education', { underline: true });
    data.education.forEach(edu => {
        doc.fontSize(14).text(edu.degree);
        doc.fontSize(12).text(`${edu.institution} - ${edu.year}`);
        doc.text(`${edu.description}`);
        doc.moveDown();
    });

    doc.end();

    return stream;
}

module.exports = { createPdfStream };
*/
