import express from 'express';
import { editTodoController } from '../controllers/todos.controller.js';
import { updateTodoValidation } from '../middlewares/todos.validation.js';

const router = express.Router();

router.use(express.json());

router.route('/:_id')
    .put(updateTodoValidation, editTodoController);

export { router as editTodoRouter };