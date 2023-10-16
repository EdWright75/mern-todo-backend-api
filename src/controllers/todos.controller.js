import { validationResult } from 'express-validator';
import { addTodoService, editTodoService, getAllTodosService } from '../services/todos.services.js';

export const getAllTodosController = async (req, res) => {
    try {
        const todos = await getAllTodosService();
        res.json(todos);
    }
    catch (e) {
        res.status(404).send(`Not found`);
    }
};

export const addTodoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Adding new todo failed`);
    }
    try {
        const todo = await addTodoService(req.body);
        res.status(201).json({ todo });
    }
    catch (e) {
        res.status(400).send(`Adding new todo failed`);
    }
};

export const editTodoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Update not possible`);
    }
    try {
        const todo = await editTodoService(req.body, req.params._id);;
        res.status(201).json({ todo });
    } catch (error) {
        res.status(404).send(`That todo cannot be found`);
    }
};