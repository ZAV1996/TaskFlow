import { Field, InputType, Int, PartialType, PickType } from "@nestjs/graphql";
import { CreateStatusInput } from "../../status/inputs/create.input";
import { WorkflowInput } from "./workflow.input";
import { StatusInput } from "src/status/inputs/status.input";
import { CreateOrUpdateStatusInput } from "src/status/inputs/createOrUpdate.input";
import { z } from 'zod'
import { createZodDto } from "nestjs-zod";

@InputType()
export class CreateWorkflowInput extends PartialType(PickType(WorkflowInput, ["description"])) {
    @Field(() => String)
    title: string
}

export const InputIDSchema = z.object({
    ID: z.number()
});
@InputType()
export class InputID extends createZodDto(InputIDSchema) {
    @Field(() => Int)
    ID: number
}

@InputType()
export class UpdateWorkflowInput {

    @Field(() => Int, { nullable: false })
    ID: number

    @Field(() => String, { nullable: true })
    title?: string
}
