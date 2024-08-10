const express = require('express');
const { School, Teacher } = require('./models/School');
const { Teacher } = require('./models/Teacher');

const router = express.Router();

router.get('/schools', async (req, res) => {
    const schools = await School.find();
    res.json(schools);
});

router.post('/schools', async (req, res) => {
    const { name, location } = req.body;
    const school = new School({ name, location });
    await school.save();
    res.status(201).json(school);
});

router.get('/schools/:schoolId/teachers', async (req, res) => {
    const { schoolId } = req.params;
    const teachers = await Teacher.find({ schoolId });
    res.json(teachers);
});

router.post('/schools/:schoolId/teachers', async (req, res) => {
    const { schoolId } = req.params;
    const { name } = req.body;
    const teacher = new Teacher({ name, schoolId });
    await teacher.save();
    res.status(201).json(teacher);
});

// Implement update and delete routes similarly

module.exports = router;
