import express from 'express';
import { getAllTodosController } from '../controllers/todos.controller.js';

const router = express.Router();

router.route(`/`)
    .get(getAllTodosController)

export { router as allTodosRouter };