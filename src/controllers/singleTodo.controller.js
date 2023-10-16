import { validationResult } from 'express-validator';

import { getTodoService, updateTodoService } from "../services/todos.service.js";

export const getSingleTodo = async (req, res) => {
    const todo = await getTodoService(req.params.id);
    if (!todo) {
        res.status(404).send(`That todo cannot be found`);
    } else {
        res.json(todo);
    }
}

export const updateTodo = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(`Update not possible.`);
    }
    try {
        const todo = await updateTodoService(req.body, req.params._id);
        res.status(201).json({ todo });
    } catch (error) {
        res.status(404).send(`That todo cannot be found`);
    }
}