import express from 'express';
import { addTodoController } from '../controllers/todos.controller.js';
import { newTodoValidation } from '../middlewares/todos.validation.js';

const router = express.Router();

router.route(`/`)
    .post(newTodoValidation, addTodoController);

export { router as addTodoRouter };