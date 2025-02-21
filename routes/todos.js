const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const moment = require('moment-timezone');

router.get('/', async(req, res) => {
    try{
        const todos = await Todo.find();
        const todosWithLocalTime = todos.map(todo => ({
            ...todo._doc,
            createdAt: moment(todo.createdAt).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
        }));
        res.status(200).json(todos); 

    }catch (error){
        res.status(500).json({message: error.message});
    }
});

router.post('/', async(req, res) => {
    try{
        const newTodo = new Todo({ title: req.body.title, completed: req.body.completed || false});
        await newTodo.save();
        res.status(201).json(newTodo);
    }catch(error){
        res.status(400).json({message: error.message});
    }
});

router.put('/:id', async(req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params
            .id, req.body, {new: true});
        if(!updatedTodo){
            res.status(404).json({message: 'Todo not found'});
        }
        updatedTodo.completed = req.body.completed;
        await updatedTodo.save();
        res.status(200).json(updatedTodo);
    }catch(error){
        res.status(400).json({message: error.message
        });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if(!deletedTodo){
            res.status(404).json({message: 'Todo tidak ditemukan'});
        }
        res.json({message: 'Todo berhasil dihapus'});
    }catch(error){
        res.status(400).json({message: error.message});
    }
});                                                                                 

module.exports = router;

