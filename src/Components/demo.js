const express = require('express');
const mongoose = require('mongoose');
// Create and import schema Ex:Schema is A structure where set deta type  
const todoSchema = require('../schemas/todosSchema');
// create model/blueprint with table name and schema. mongoose contain model class 
const Todo = new mongoose.model('Todo', todoSchema);

const router = express.Router();

// GET ALL TODOS
router.get('/', async (req, res) => {
    try {
        const todo = await Todo.find({ status: 'inactive' }).select({ date: 0 });
        res.status(201).json({ message: 'Todos are get successfully.', todo });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})
// GET SINGLE TODOS
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.find({ _id: req.params.id });
        res.status(201).json({ message: 'Todo is get successfully.', todo });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})

// get active
router.get('/active', async (req, res) => {
    try {
        const todo = new Todo();
        const data = await todo.findActive();
        console.log(data);
        res.status(200).json({ data, });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})

// POST A TODOS
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);  // inherit Todo class by user data.
    try {
        await newTodo.save();  // Todo/blueprint/data model- class contain save() method, here save() is build in instance method. inherited this method
        res.status(201).json({ message: 'Todo was inserted successfully.', todo: newTodo });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
});
// POST MULTIPLE TODOS
router.post('/all', async (req, res) => {
    try {
        const todos = await Todo.insertMany(req.body);
        res.status(201).json({ message: 'Multiple Todo ware inserted successfully.', todos });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})
// PUT TODOS
router.put('/:id', async (req, res) => {
    try {
        const todos = await Todo.updateOne({ _id: req.params.id }, {
            $set: { status: 'most active' }
        });
        res.status(201).json({ message: 'Update single todo successfully.', todos });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})

// DELETE TODOS
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.deleteOne({ _id: req.params.id });
        res.status(201).json({ message: 'Delete your single todo successfully.', todo });
    } catch (err) {
        res.status(500).json({ error: 'There was a server-side error!' });
    }
})

module.exports = router;