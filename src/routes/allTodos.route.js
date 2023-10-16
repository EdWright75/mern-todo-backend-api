import express from 'express';
import { allTodos } from '../controllers/allTodos.controller.js';

const router = express.Router();

router.route(`/`)
    .get(allTodos);

export { router as allTodos };