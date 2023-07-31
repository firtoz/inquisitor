import {Field, ObjectType} from "type-graphql";

@ObjectType(
    'TodoList',
    {
        description: "Object representing a todo list"
    }
)
export class TodoListDTO {
    @Field()
    id!: string;

    @Field()
    name!: string;

    @Field()
    description!: string;

    @Field()
    creationDate!: Date;
}
