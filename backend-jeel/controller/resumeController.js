//logic for handling file uploads and parsing

const { v4: uuidv4 } = require('uuid');


let resumes = {};

exports.createResume = (req, res) => {
    try {
        const id = uuidv4();
        const newResume = { id, ...req.body };
        resumes[id] = newResume;
        res.status(201).json(newResume);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllResumes = (req, res) => {
    try {
        res.status(200).json(Object.values(resumes));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getResumeById = (req, res) => {
    try {
        const resume = resumes[req.params.id];
        if (!resume) return res.status(404).json({ error: 'Resume not found' });
        res.status(200).json(resume);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateResume = (req, res) => {
    try {
        const resume = resumes[req.params.id];
        if (!resume) return res.status(404).json({ error: 'Resume not found' });
        const updatedResume = { ...resume, ...req.body };
        resumes[req.params.id] = updatedResume;
        res.status(200).json(updatedResume);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteResume = (req, res) => {
    try {
        const resume = resumes[req.params.id];
        if (!resume) return res.status(404).json({ error: 'Resume not found' });
        delete resumes[req.params.id];
        res.status(200).json({ message: 'Resume deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
