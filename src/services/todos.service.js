import Todo from '../models/todo.model.js';

export const addTodoService = async todo => {
    try {
        const newTodo = new Todo(todo);
        return await newTodo.save();
    } catch (e) {
        throw e
    }
}

export const getTodoService = async id => {
    try {
        return await Todo.findById(id);
    }
    catch (e) {
        throw e;
    }
}

export const getTodosService = async () => {
    try {
        return await Todo.find({});
    }
    catch (e) {
        throw e;
    }
}

export const updateTodoService = async (todo, _id) => {
    console.log(_id);
    const updatedTodo = { ...todo };
    delete updatedTodo._id;

    try {
        return await Todo.findByIdAndUpdate({ _id: _id }, updatedTodo);
    }
    catch (e) {
        throw e;
    }
}