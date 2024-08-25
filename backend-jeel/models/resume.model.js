const { v4: uuidv4 } = require('uuid');

let resumes = {};  // Store resumes as an object


const create = (resume) => {
    const id = uuidv4();  // Generate a unique UUID
    resumes[id] = { id, ...resume };
    return resumes[id];
};


const getAll = () => Object.values(resumes);


const getById = (id) => resumes[id] || null;

// Update a resume
const updateById = (id, updates) => {
    if (resumes[id]) {
        resumes[id] = { ...resumes[id], ...updates };
        return resumes[id];
    }
    return null;
};


// Delete a resume by ID
const deleteById = (id) => {
    if (resumes[id]) {
        delete resumes[id];
        return true;
    }
    return false;
};

module.exports = { create, getAll, getById, updateById, deleteById };
