import { InputType, Field, Float } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { InputID, InputIDSchema } from 'src/workflow/inputs/create.input';
import z from "zod"
export const CreateRiskInputSchema = z.object({
  id: z.number(),
  Project: InputIDSchema,
  description: z.string().trim().optional(),
  category: z.string().trim(),
  probability: z.number().min(0).max(1),
  impact: z.number().min(1).max(5),
  mitigationPlan: z.string().trim()
})
@InputType()
export class CreateRiskInput extends createZodDto(CreateRiskInputSchema) {
  @Field({ description: "ID проекта" })
  Project: InputID;

  @Field({ description: "Описание риска" })
  description: string;

  @Field({ description: "Категория риска" })
  category: string;

  @Field(() => Float, { description: "Вероятность риска от 0 до 1" })
  probability: number;

  @Field(() => Float, { description: "Влияние/Воздействие риска на проект от 1 до 5" })
  impact: number;

  @Field(() => String, { description: "План действий для уменьшения возникновения этого риска" })
  mitigationPlan: string;
}