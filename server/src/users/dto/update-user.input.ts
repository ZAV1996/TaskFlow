import { InputType, Field, Int, OmitType, PartialType } from '@nestjs/graphql';
import { UserInput, UserInputSchema } from './user.input';
import { createZodDto } from 'nestjs-zod';

@InputType()
export class UpdateUserInput extends createZodDto(UserInputSchema.omit({
  ID: true,
})) {
  @Field(() => Int, { description: "Идентификатор обновляемого пользователя пользователя (сам ID изменить нельзя)" })
  ID: number

  @Field(() => String, { nullable: true })
  department: string

  @Field(() => String, { nullable: true })
  email: string

  @Field(() => Boolean, { nullable: true })
  isActivated: boolean

  @Field(() => String, { nullable: true })
  name: string

  @Field(() => String, { nullable: true })
  password: string

  @Field(() => String, { nullable: true })
  patronymic: string

  @Field(() => String, { nullable: true })
  surname: string
}