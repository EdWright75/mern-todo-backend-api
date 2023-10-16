import { validationResult } from 'express-validator';
import { addTodoService } from '../services/todos.service.js';


export const addTodoController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Adding new todo failed`);
    }
    try {
        const todo = await addTodoService(req.body);
        res.status(201).json({ todo });
    } catch (error) {
        console.log(error);
        res.status(400).send(`Adding new todo failed`);
    }
};