import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

import { allTodos } from './src/routes/allTodos.route.js';
import { singleTodo } from './src/routes/singleTodo.route.js';
import { addTodo } from './src/routes/addTodo.route.js';

const port = process.env.PORT;
const host = process.env.HOST;
const app = express();

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB @ ${process.env.DB_URI}`);
}

main().catch(err => console.log(err))

// This can be used instead of importing bodyParser!
app.use(express.json());
app.use(cors());
app.use(`/todos`, allTodos);
app.use(`/todos`, addTodo);
app.use(`/todos`, singleTodo);


const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is runnning on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;