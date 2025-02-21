const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true},
    completed: {type: Boolean, default: false},
    createdAt: { 
        type: Date, 
        default: () => new Date(new Date().getTime() + (7 * 60 * 60 * 1000))  
    }
});

module.exports = mongoose.model('Todo', todoSchema);