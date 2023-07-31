'use client';

import React from 'react';

import './page.module.css';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {
    useTodoItemsForListQuery,
    useTodoListsQuery,
    useMarkTodoItemAsDoneMutation,
    useCreateTodoListMutation,
    useCreateTodoItemMutation, TodoItemFieldsFragment,
} from "schemas";
import classNames from "classnames";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

function TodoItem({
                      todo,
                      refetch,
                  }: {
    todo: TodoItemFieldsFragment,
    refetch: () => Promise<any>,
}) {
    const {
        mutateAsync: markTodoItemAsDone,
    } = useMarkTodoItemAsDoneMutation();

    return <div className="row">
        <div className="col-md-1">
            <input type="checkbox" checked={todo.done} onChange={
                async (event) => {
                    await markTodoItemAsDone({
                        id: todo.id,
                        done: event.target.checked,
                    });

                    await refetch();
                }
            }/>
        </div>
        <div className="col-md-10">
            {todo.title}
        </div>
    </div>;
}

function TodoList(props: { todoListId: string }) {
    const {
        data,
        refetch,
    } = useTodoItemsForListQuery({
        listId: props.todoListId,
    }, {
        suspense: true,
    });

    const {
        mutateAsync: createTodoItem,
    } = useCreateTodoItemMutation();

    const todos = data.todoItemsForList;

    return (
        <div>
            <ul className="list-group">
                {todos.map((todo) => {
                    return <li key={todo.id} className="list-group-item">
                        <TodoItem
                            todo={todo}
                            refetch={refetch}
                        />
                    </li>
                })}
                <li className="list-group-item">
                    <div className="row">
                        <div className="col-md-1">
                            <input type="checkbox" checked={false} onChange={() => {
                            }} disabled={true}/>
                        </div>
                        <div className="col-md-10">
                            <button
                                className="btn btn-link"
                                onClick={async () => {
                                    const title = prompt('Enter title for new todo item');

                                    if (title) {
                                        await createTodoItem({
                                            listId: props.todoListId,
                                            title,
                                            description: '',
                                        });

                                        await refetch();
                                    }
                                }}
                            >Add Todo Item
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

const Todos = () => {
    const {
        data,
        refetch,
    } = useTodoListsQuery(undefined, {
        suspense: true,
    });

    const [selectedTodoList, setSelectedTodoList] = React.useState(0);

    const {
        mutateAsync: createTodoList,
    } = useCreateTodoListMutation();

    return (
        <div>
            <h1>Todo Lists</h1>
            <ul className="nav nav-tabs">
                {data.todoLists.map((todoList, index) => {
                    return <li
                        key={todoList.id}
                        className={
                            classNames('nav-item', {
                                'active': index === selectedTodoList
                            })}
                    >
                        <a
                            className={
                                classNames('nav-link', {
                                    'active': index === selectedTodoList
                                })}
                            onClick={() => setSelectedTodoList(index)}
                            style={{cursor: 'pointer'}}
                        >{todoList.name}</a>
                    </li>
                })}
                <li className="nav-item">
                    <a
                        className="nav-link"
                        style={{cursor: 'pointer'}}
                        onClick={async () => {
                            const name = prompt('Enter name for new todo list');

                            if (name) {
                                await createTodoList({
                                    name,
                                    description: '',
                                });

                                await refetch();

                                setSelectedTodoList(data.todoLists.length);
                            }
                        }}
                    >Add Todo List</a>
                </li>
            </ul>
            <div className="row">
                <div className="col-md-12">
                    <h2>Todo List</h2>
                    <React.Suspense fallback="Loading...">
                        <TodoList todoListId={data.todoLists[selectedTodoList].id}/>
                    </React.Suspense>
                </div>
            </div>
        </div>
    )
}

const MainPage = () => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return <div>
        <QueryClientProvider client={queryClient}>
            <React.Suspense fallback="Loading...">
                <Todos/>
            </React.Suspense>
        </QueryClientProvider>
    </div>
}

export default MainPage;
