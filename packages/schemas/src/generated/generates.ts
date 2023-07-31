import {
    useQuery,
    useMutation,
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { useFetchData } from "../fetcher";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never;
      };
export const TodoItemFieldsFragmentDoc = `
    fragment TodoItemFields on TodoItem {
  id
  title
  description
  creationDate
  completedDate
  listId
  done
}
    `;
export const TodoListFieldsFragmentDoc = `
    fragment TodoListFields on TodoList {
  id
  name
  description
  creationDate
}
    `;
export const TodoItemsForListDocument = `
    query TodoItemsForList($listId: String!) {
  todoItemsForList(listId: $listId) {
    ...TodoItemFields
  }
}
    ${TodoItemFieldsFragmentDoc}`;
export const useTodoItemsForListQuery = <
    TData = TodoItemsForListQuery,
    TError = Error,
>(
    variables: TodoItemsForListQueryVariables,
    options?: UseQueryOptions<TodoItemsForListQuery, TError, TData>,
) =>
    useQuery<TodoItemsForListQuery, TError, TData>(
        ["TodoItemsForList", variables],
        useFetchData<TodoItemsForListQuery, TodoItemsForListQueryVariables>(
            TodoItemsForListDocument,
        ).bind(null, variables),
        options,
    );
export const TodoListsDocument = `
    query TodoLists {
  todoLists {
    ...TodoListFields
  }
}
    ${TodoListFieldsFragmentDoc}`;
export const useTodoListsQuery = <TData = TodoListsQuery, TError = Error>(
    variables?: TodoListsQueryVariables,
    options?: UseQueryOptions<TodoListsQuery, TError, TData>,
) =>
    useQuery<TodoListsQuery, TError, TData>(
        variables === undefined ? ["TodoLists"] : ["TodoLists", variables],
        useFetchData<TodoListsQuery, TodoListsQueryVariables>(
            TodoListsDocument,
        ).bind(null, variables),
        options,
    );
export const CreateTodoItemDocument = `
    mutation CreateTodoItem($title: String!, $description: String!, $listId: String!) {
  addTodoItem(title: $title, description: $description, listId: $listId) {
    ...TodoItemFields
  }
}
    ${TodoItemFieldsFragmentDoc}`;
export const useCreateTodoItemMutation = <TError = Error, TContext = unknown>(
    options?: UseMutationOptions<
        CreateTodoItemMutation,
        TError,
        CreateTodoItemMutationVariables,
        TContext
    >,
) =>
    useMutation<
        CreateTodoItemMutation,
        TError,
        CreateTodoItemMutationVariables,
        TContext
    >(
        ["CreateTodoItem"],
        useFetchData<CreateTodoItemMutation, CreateTodoItemMutationVariables>(
            CreateTodoItemDocument,
        ),
        options,
    );
export const CreateTodoListDocument = `
    mutation CreateTodoList($name: String!, $description: String!) {
  addTodoList(name: $name, description: $description) {
    ...TodoListFields
  }
}
    ${TodoListFieldsFragmentDoc}`;
export const useCreateTodoListMutation = <TError = Error, TContext = unknown>(
    options?: UseMutationOptions<
        CreateTodoListMutation,
        TError,
        CreateTodoListMutationVariables,
        TContext
    >,
) =>
    useMutation<
        CreateTodoListMutation,
        TError,
        CreateTodoListMutationVariables,
        TContext
    >(
        ["CreateTodoList"],
        useFetchData<CreateTodoListMutation, CreateTodoListMutationVariables>(
            CreateTodoListDocument,
        ),
        options,
    );
export const DeleteTodoItemDocument = `
    mutation DeleteTodoItem($id: String!) {
  deleteTodoItem(id: $id)
}
    `;
export const useDeleteTodoItemMutation = <TError = Error, TContext = unknown>(
    options?: UseMutationOptions<
        DeleteTodoItemMutation,
        TError,
        DeleteTodoItemMutationVariables,
        TContext
    >,
) =>
    useMutation<
        DeleteTodoItemMutation,
        TError,
        DeleteTodoItemMutationVariables,
        TContext
    >(
        ["DeleteTodoItem"],
        useFetchData<DeleteTodoItemMutation, DeleteTodoItemMutationVariables>(
            DeleteTodoItemDocument,
        ),
        options,
    );
export const MarkTodoItemAsDoneDocument = `
    mutation MarkTodoItemAsDone($id: String!, $done: Boolean!) {
  markTodoItemAsDone(id: $id, done: $done) {
    ...TodoItemFields
  }
}
    ${TodoItemFieldsFragmentDoc}`;
export const useMarkTodoItemAsDoneMutation = <
    TError = Error,
    TContext = unknown,
>(
    options?: UseMutationOptions<
        MarkTodoItemAsDoneMutation,
        TError,
        MarkTodoItemAsDoneMutationVariables,
        TContext
    >,
) =>
    useMutation<
        MarkTodoItemAsDoneMutation,
        TError,
        MarkTodoItemAsDoneMutationVariables,
        TContext
    >(
        ["MarkTodoItemAsDone"],
        useFetchData<
            MarkTodoItemAsDoneMutation,
            MarkTodoItemAsDoneMutationVariables
        >(MarkTodoItemAsDoneDocument),
        options,
    );
export type TodoItemFieldsFragment = {
    readonly __typename?: "TodoItem";
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly creationDate: Date;
    readonly completedDate?: Date | null;
    readonly listId: string;
    readonly done: boolean;
};

export type TodoListFieldsFragment = {
    readonly __typename?: "TodoList";
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly creationDate: Date;
};

export type TodoItemsForListQueryVariables = Exact<{
    listId: Scalars["String"]["input"];
}>;

export type TodoItemsForListQuery = {
    readonly __typename?: "Query";
    readonly todoItemsForList: ReadonlyArray<
        { readonly __typename?: "TodoItem" } & TodoItemFieldsFragment
    >;
};

export type TodoListsQueryVariables = Exact<{ [key: string]: never }>;

export type TodoListsQuery = {
    readonly __typename?: "Query";
    readonly todoLists: ReadonlyArray<
        { readonly __typename?: "TodoList" } & TodoListFieldsFragment
    >;
};

export type CreateTodoItemMutationVariables = Exact<{
    title: Scalars["String"]["input"];
    description: Scalars["String"]["input"];
    listId: Scalars["String"]["input"];
}>;

export type CreateTodoItemMutation = {
    readonly __typename?: "Mutation";
    readonly addTodoItem: {
        readonly __typename?: "TodoItem";
    } & TodoItemFieldsFragment;
};

export type CreateTodoListMutationVariables = Exact<{
    name: Scalars["String"]["input"];
    description: Scalars["String"]["input"];
}>;

export type CreateTodoListMutation = {
    readonly __typename?: "Mutation";
    readonly addTodoList: {
        readonly __typename?: "TodoList";
    } & TodoListFieldsFragment;
};

export type DeleteTodoItemMutationVariables = Exact<{
    id: Scalars["String"]["input"];
}>;

export type DeleteTodoItemMutation = {
    readonly __typename?: "Mutation";
    readonly deleteTodoItem: boolean;
};

export type MarkTodoItemAsDoneMutationVariables = Exact<{
    id: Scalars["String"]["input"];
    done: Scalars["Boolean"]["input"];
}>;

export type MarkTodoItemAsDoneMutation = {
    readonly __typename?: "Mutation";
    readonly markTodoItemAsDone: {
        readonly __typename?: "TodoItem";
    } & TodoItemFieldsFragment;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
    DateTime: { input: Date; output: Date };
};

export type Mutation = {
    readonly __typename?: "Mutation";
    readonly addTodoItem: TodoItem;
    readonly addTodoList: TodoList;
    readonly deleteTodoItem: Scalars["Boolean"]["output"];
    readonly markTodoItemAsDone: TodoItem;
};

export type MutationAddTodoItemArgs = {
    description?: InputMaybe<Scalars["String"]["input"]>;
    listId: Scalars["String"]["input"];
    title: Scalars["String"]["input"];
};

export type MutationAddTodoListArgs = {
    description?: InputMaybe<Scalars["String"]["input"]>;
    name: Scalars["String"]["input"];
};

export type MutationDeleteTodoItemArgs = {
    id: Scalars["String"]["input"];
};

export type MutationMarkTodoItemAsDoneArgs = {
    done: Scalars["Boolean"]["input"];
    id: Scalars["String"]["input"];
};

export type Query = {
    readonly __typename?: "Query";
    readonly todoItems: ReadonlyArray<TodoItem>;
    readonly todoItemsForList: ReadonlyArray<TodoItem>;
    readonly todoLists: ReadonlyArray<TodoList>;
};

export type QueryTodoItemsForListArgs = {
    listId: Scalars["String"]["input"];
};

/** Object representing a todo item */
export type TodoItem = {
    readonly __typename?: "TodoItem";
    readonly completedDate?: Maybe<Scalars["DateTime"]["output"]>;
    readonly creationDate: Scalars["DateTime"]["output"];
    readonly description: Scalars["String"]["output"];
    readonly done: Scalars["Boolean"]["output"];
    readonly dueDate?: Maybe<Scalars["DateTime"]["output"]>;
    readonly id: Scalars["String"]["output"];
    /** Get the parent todo list for a todo item */
    readonly list: TodoList;
    readonly listId: Scalars["String"]["output"];
    readonly title: Scalars["String"]["output"];
};

/** Object representing a todo list */
export type TodoList = {
    readonly __typename?: "TodoList";
    readonly creationDate: Scalars["DateTime"]["output"];
    readonly description: Scalars["String"]["output"];
    readonly id: Scalars["String"]["output"];
    readonly name: Scalars["String"]["output"];
    /** Get all todos for a list */
    readonly todos: ReadonlyArray<TodoItem>;
};
