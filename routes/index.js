const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find() || []; // Pastikan `todos` selalu array
        res.render('index', { title: 'My To-Do List', todos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving To-Do List");
    }
});

module.exports = router;
