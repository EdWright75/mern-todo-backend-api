import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDb } from './src/db/db.connection.js';

import { addTodoRouter } from './src/routes/addTodo.route.js';
import { allTodosRouter } from './src/routes/allTodos.route.js';
import { editTodoRouter } from './src/routes/editTodo.route.js';

const app = express();

dotenv.config({
    path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

app.use(cors());
app.use(express.json());

connectDb();

app.use(`/todos`, allTodosRouter);
app.use(`/todos`, addTodoRouter);
app.use(`/todos`, editTodoRouter);

const { PORT, HOST } = process.env;

const server = app.listen(PORT, HOST, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is listening at http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;