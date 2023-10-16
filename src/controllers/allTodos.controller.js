import { getTodosService } from '../services/todos.service.js';

export const allTodos = async (req, res) => {
    try {
        const todos = await getTodosService();
        res.json(todos)
    } catch (e) {
        res.status(404).send(`Not found`);
    }
}