import {Field, ObjectType} from "type-graphql";


@ObjectType(
    'TodoItem',
    {
        description: "Object representing a todo item",
    }
)
export class TodoItemDTO {
    @Field()
    id!: string;

    @Field()
    title!: string;

    @Field()
    description!: string;

    @Field()
    creationDate!: Date;

    // an optional due date
    @Field({nullable: true})
    dueDate?: Date;

    @Field({nullable: true})
    completedDate?: Date;

    // a boolean indicating whether the todo item is done
    @Field()
    done!: boolean;

    // list id
    @Field()
    listId!: string;
}
