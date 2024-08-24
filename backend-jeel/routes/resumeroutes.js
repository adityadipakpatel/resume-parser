const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

//Route to get all resumes
router.get('/', (req, res) => {
    resumeController.getAllResumes(req, res);
});

//Route to create a new resume
router.post('/', (req, res) => {
    resumeController.createResume(req, res);
});

//Route to get a resume by ID
router.get('/:id', (req, res) => {
    resumeController.getResumeById(req, res);
});

//updates a resume by ID
router.put('/:id', (req, res) => {
    resumeController.updateResume(req, res);
});

//deletes a resume by ID
router.delete('/:id', (req, res) => {
    resumeController.deleteResume(req, res);
});

module.exports = router;
