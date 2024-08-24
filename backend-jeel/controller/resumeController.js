const express = require('express');
const router = express.Router();
const Resume = require('../models/resume.model');

// Route to get all resumes
router.route('/').get((req, res) => {
    const resumes = Resume.getAll();
    res.json(resumes);
});

// Route to create a new resume
router.route('/').post((req, res) => {
    const { name, email, phone, skills, experience, education } = req.body;

    // Check if required fields are provided
    if (!name || !email || !phone || !skills || !experience || !education) {
        return res.status(400).json('Error: Missing required fields');
    }

    const newResume = Resume.create({
        name,
        email,
        phone,
        skills,
        experience,
        education,
    });

    res.status(201).json(newResume);
});

// Route to get a resume by ID
router.route('/:id').get((req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const resume = Resume.getById(resumeId);

    if (!resume) {
        return res.status(404).json('Error: Resume not found');
    }
    else {
        res.json(resume);
    }
});

// Route to delete a resume by ID
router.route('/:id').delete((req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const success = Resume.deleteById(resumeId);

    if (!success) {
        return res.status(404).json('Error: Resume not found');
    }
    else {
        res.json('Resume deleted.');
    }
});


router.route('/:id').put((req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedResume = Resume.updateById(resumeId, updates);

    if (!updatedResume) {
        return res.status(404).json('Error: Resume not found');
    }
    else {
        res.json(updatedResume);
    }
});

module.exports = router;
