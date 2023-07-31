import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {v4 as uuidv4} from "uuid";
import {todoLists, todos} from "../../data/todo";
import {TodoItemDTO, TodoListDTO} from "../DTOs";

@Resolver(_of => TodoItemDTO)
export class TodoItemResolver {
    // get all todo items
    @Query(() => [TodoItemDTO])
    async todoItems(): Promise<TodoItemDTO[]> {
        return todos;
    }

    // get todo items for a given list
    @Query(() => [TodoItemDTO])
    async todoItemsForList(@Arg("listId") listId: string): Promise<TodoItemDTO[]> {
        return todos.filter((todo) => todo.listId === listId);
    }

    // add a new todo item with a given title and optional description
    @Mutation(() => TodoItemDTO)
    async addTodoItem(
        @Arg("listId") listId: string,
        @Arg("title") title: string,
        @Arg("description", {nullable: true}) description?: string
    ): Promise<TodoItemDTO> {
        // check that the list exists
        const list = todoLists.find((list) => list.id === listId);
        if (!list) {
            throw new Error(`Todo list with id ${listId} not found`);
        }

        const todo: TodoItemDTO = {
            id: uuidv4(),
            title,
            description: description || "",
            creationDate: new Date(),
            done: false,
            listId,
        };
        todos.push(todo);
        return todo;
    }

    // mark a todo item as done
    @Mutation(() => TodoItemDTO)
    async markTodoItemAsDone(
        @Arg("id") id: string,
        @Arg("done") done: boolean
    ): Promise<TodoItemDTO> {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            throw new Error(`Todo item with id ${id} not found`);
        }
        todo.done = done;
        return todo;
    }

    // delete a todo item
    @Mutation(() => Boolean)
    async deleteTodoItem(@Arg("id") id: string): Promise<boolean> {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index === -1) {
            throw new Error(`Todo item with id ${id} not found`);
        }
        todos.splice(index, 1);
        return true;
    }

    // get the parent todo list for a todo item
    @FieldResolver(() => TodoListDTO, {description: "Get the parent todo list for a todo item"})
    async list(@Root() todo: TodoItemDTO): Promise<TodoListDTO> {
        return todoLists.find((list) => list.id === todo.listId)!;
    }
}
