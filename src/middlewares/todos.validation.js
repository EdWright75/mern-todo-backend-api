import { check } from 'express-validator';

export const newTodoValidation = [
    check('todoDescription').exists().isString(),
    check('todoDateCreated').exists().isISO8601(),      // This is the ISO standard for an ISO date!
    check('todoCompleted').exists().isBoolean()
];

export const updateTodoValidation = [
    check('todoDescription').exists().isString(),
    check('todoDateCreated').exists().isISO8601(),
    check('todoCompleted').exists().isBoolean(),
    check('_id').exists().isMongoId(),
];