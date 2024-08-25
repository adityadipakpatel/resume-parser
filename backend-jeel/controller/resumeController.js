const Resume = require('../models/resume.model');

// Controller to get all resumes
const getAllResumes = (req, res) => {
    const resumes = Resume.getAll();
    res.json(resumes);
};

// Controller to create a new resume
const createResume = (req, res) => {
    const { name, email, phone, skills, experience, education } = req.body;

    // Check if required fields are provided
    if (!name || !email || !phone || !skills || !experience || !education) {
        return res.status(400).json({ error: 'Missing required fields' });
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
};

// Controller to get a resume by ID
const getResumeById = (req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const resume = Resume.getById(resumeId);

    if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
};

// Controller to delete a resume by ID
const deleteResume = (req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const success = Resume.deleteById(resumeId);

    if (!success) {
        return res.status(404).json({ error: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted.' });
};

// Controller to update a resume by ID
const updateResume = (req, res) => {
    const resumeId = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedResume = Resume.updateById(resumeId, updates);

    if (!updatedResume) {
        return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(updatedResume);
};

module.exports = {
    getAllResumes,
    createResume,
    getResumeById,
    deleteResume,
    updateResume,
};
