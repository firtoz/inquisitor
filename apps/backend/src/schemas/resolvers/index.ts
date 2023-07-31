import {TodoItemResolver} from './todoItemResolver';
import {TodoListResolver} from './todoListResolver';

export const allResolvers = [
    TodoListResolver,
    TodoItemResolver,
] as const;
