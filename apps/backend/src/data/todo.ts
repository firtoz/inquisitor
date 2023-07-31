import {v4 as uuidv4} from "uuid";
import {TodoItemDTO, TodoListDTO} from "../schemas";

export const todoLists: TodoListDTO[] = [
    {
        id: "1",
        name: "List 1",
        description: "Desc 1",
        creationDate: new Date("2018-04-11"),
    },
    {
        id: "2",
        name: "List 2",
        description: "Desc 2",
        creationDate: new Date("2018-04-11"),
    },
];

export const todos: TodoItemDTO[] = [
    {
        id: uuidv4(),
        title: "Todo 1",
        description: "Desc 1",
        creationDate: new Date("2018-04-11"),
        done: false,
        listId: todoLists[0].id,
    },
    {
        id: uuidv4(),
        title: "Todo 2",
        description: "Desc 2",
        creationDate: new Date("2018-04-11"),
        done: false,
        listId: todoLists[0].id,
    },
    {
        id: uuidv4(),
        title: "Todo 3",
        description: "Desc 3",
        creationDate: new Date("2018-04-11"),
        done: false,
        listId: todoLists[1].id,
    },
    {
        id: uuidv4(),
        title: "Todo 4",
        description: "Desc 4",
        creationDate: new Date("2018-04-11"),
        done: false,
        listId: todoLists[1].id,
    },
];
