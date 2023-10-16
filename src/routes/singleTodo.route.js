import express from 'express';
import { getSingleTodo, updateTodo } from '../controllers/singleTodo.controller.js';
import { updateTodoValidation } from '../middlewares/todos.validation.js';


const router = express.Router();

router.use(express.json());

router.route('/:_id')
    .get(getSingleTodo)
    .put(updateTodoValidation, updateTodo);

export { router as singleTodo };