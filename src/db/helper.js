const emptyOrRows = rows => {
    if (!rows) {
        return [];
    }
    return rows;
};

export const camelCaseFields = todo => {
    const {
        _id,
        todo_description: todoDescription,
        todo_date_created: todoDateCreated,
        todo_completed: todoCompleted
    } = todo;
    return ({
        todoDescription,
        todoDateCreated,
        todoCompleted,
        _id
    });
};

export const camelCaseResultsSet = rows => {
    return (rows.length === 0) ? [] : rows.map(todo => camelCaseFields(todo)); 
}

export const pascal_case_fields = newTodo => (
    {
        todo_description: newTodo.todoDescription,
        todo_date_created: newTodo.todoDateCreated,
        todo_completed: newTodo.todoCompleted,
        _id: newTodo._id
    }
);