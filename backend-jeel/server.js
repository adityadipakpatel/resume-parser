const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const resumeroutes = require('./routes/resumeroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes for handling resumes
//app.use('/api/resumes', resumeroutes);

// Serve the frontend HTML file for any non-API route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
