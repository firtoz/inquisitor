import {Arg, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {v4 as uuidv4} from "uuid";
import {todoLists, todos} from "../../data/todo";
import {TodoItemDTO} from "../DTOs/todoItemDTO";
import {TodoListDTO} from "../DTOs/todoListDTO";

@Resolver(_of => TodoListDTO)
export class TodoListResolver {
    // get all todo lists
    @Query(() => [TodoListDTO])
    async todoLists(): Promise<TodoListDTO[]> {
        // resolve todos for each list
        return todoLists;
    }

    // add a new todo list with a given name and optional description
    @Mutation(() => TodoListDTO)
    async addTodoList(
        @Arg("name") name: string,
        @Arg("description", {nullable: true}) description?: string
    ): Promise<TodoListDTO> {
        const list: TodoListDTO = {
            id: uuidv4(),
            name,
            description: description || "",
            creationDate: new Date(),
        };
        todoLists.push(list);
        return list;
    }

    @FieldResolver(() => [TodoItemDTO], {description: "Get all todos for a list"})
    async todos(@Root() list: TodoListDTO): Promise<TodoItemDTO[]> {
        return todos.filter((todo) => todo.listId === list.id);
    }
}
