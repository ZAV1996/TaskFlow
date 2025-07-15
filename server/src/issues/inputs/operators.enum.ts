// import { Field, InputType, registerEnumType } from '@nestjs/graphql';
// import { createZodDto } from 'nestjs-zod';
// import { z, ZodIssueCode } from 'zod';



// export enum Fields {
//     project = 'project',
//     title = 'title',
//     assignee = 'assignee',
//     author = 'author',
//     childrenIssues = 'childrenIssues',
//     parentIssue = 'parentIssue',
//     components = 'components',
//     description = 'description',
//     fixVersion = 'fixVersion',
//     issueType = 'issueType',
//     priority = 'priority',
// }

// export enum Sort {
//     ASC = "ASC",
//     DESC = "DESC"
// }

// export enum LogicalOperator {
//     AND = "AND",
//     OR = "OR"
// }

// export enum FunctionCall {
//     CURRENT_USER = "CURRENT_USER",
//     UPDATED_BY = "UPDATED_BY",
//     CLOSED_SPRINTS = "CLOSED_SPRINTS",
//     MEMBERS_OF = "MEMBERS_OF",
//     NOW = "NOW",
//     RELEASED_VERSIONS = "RELEASED_VERSIONS",
//     UNRELEASED_VERSION = "UNRELEASED_VERSION"
// }

// export enum VersionFC {
//     "UNRELEASED_VERSION" = FunctionCall.UNRELEASED_VERSION,
//     "RELEASED_VERSIONS" = FunctionCall.RELEASED_VERSIONS,
// }

// export enum UserFC {
//     "CURRENT_USER" = FunctionCall.CURRENT_USER,
//     "MEMBERS_OF" = FunctionCall.MEMBERS_OF,
// }

// export enum DescriptionAvalableOperators {
//     "EQUALS" = Operator.EQUALS,
//     "NOT_EQUALS" = Operator.NOT_EQUALS,
//     "IS_NULL" = Operator.IS_NULL,
//     "IS_NOT_NULL" = Operator.IS_NOT_NULL,
// }
// export enum CommonAvalableOperators {
//     "EQUALS" = Operator.EQUALS,
//     "NOT_EQUALS" = Operator.NOT_EQUALS,
//     "IN" = Operator.IN,
//     "NOT_IN" = Operator.NOT_IN,
//     "IS_NULL" = Operator.IS_NULL,
//     "IS_NOT_NULL" = Operator.IS_NOT_NULL,
// }

// export enum ProjectAvalableOperators {
//     "EQUALS" = Operator.EQUALS,
//     "NOT_EQUALS" = Operator.NOT_EQUALS,
//     "IN" = Operator.IN,
//     "NOT_IN" = Operator.NOT_IN,
// }
// export enum TitleAvalableOperators {
//     "EQUALS" = Operator.EQUALS,
//     "NOT_EQUALS" = Operator.NOT_EQUALS,
// }
// {
//     registerEnumType(VersionFC, {
//         name: 'VersionFC',
//     });
//     registerEnumType(TitleAvalableOperators, {
//         name: 'TitleAvalableOperators',
//     });
//     registerEnumType(ProjectAvalableOperators, {
//         name: 'ProjectAvalableOperators',
//     });
//     registerEnumType(UserFC, {
//         name: 'UserFC',
//     });
//     registerEnumType(Sort, {
//         name: 'Sort',
//     });

//     registerEnumType(Fields, {
//         name: 'Fields',
//     });

//     registerEnumType(FunctionCall, {
//         name: 'FunctionCall',
//     });
//     registerEnumType(LogicalOperator, {
//         name: 'LogicalOperator',
//     });

//     registerEnumType(Operator, {
//         name: 'Operator',
//     });
// }

// const operatorsWithoutFunctionAndValue = [
//     Operator.IS_NULL,
//     Operator.IS_NOT_NULL,
// ] as const;

// const functionsWithoutValue = [
//     FunctionCall.NOW,
//     FunctionCall.CURRENT_USER,
//     FunctionCall.UNRELEASED_VERSION,
// ] as const;




// const LogicalOperatorSchema = z.nativeEnum(LogicalOperator);
// const SortSchema = z.nativeEnum(Sort);

// const FieldFunctionOperatorMap = {
//     [Fields.project]: {
//         available_operators: ProjectAvalableOperators,
//         value: 'number'
//     },
//     [Fields.title]: {
//         available_operators: TitleAvalableOperators,
//         value: 'string'
//     },
//     [Fields.assignee]: {
//         available_operators: CommonAvalableOperators,
//         available_functions: UserFC,
//         value: 'number'
//     },
//     [Fields.author]: {
//         available_operators: CommonAvalableOperators,
//         available_functions: UserFC,
//         value: 'number'
//     },
//     [Fields.childrenIssues]: {
//         available_operators: CommonAvalableOperators,
//         value: 'number'
//     },
//     [Fields.parentIssue]: {
//         available_operators: CommonAvalableOperators,
//         value: 'number'
//     },
//     [Fields.components]: {
//         available_operators: CommonAvalableOperators,
//         value: 'number'
//     },
//     [Fields.description]: {
//         available_operators: DescriptionAvalableOperators,
//         value: 'string'
//     },
//     [Fields.fixVersion]: {
//         available_operators: CommonAvalableOperators,
//         available_functions: VersionFC,
//         value: 'number'
//     },
//     [Fields.issueType]: {
//         available_operators: CommonAvalableOperators,
//         value: 'number'
//     },
//     [Fields.priority]: {
//         available_operators: CommonAvalableOperators,
//         value: 'number'
//     },
// }
// const valueSchema = z.union([
//     z.string(),
//     z.number(),
//     z.array(z.number()),
// ]);

// // Схема для ConditionItem с условной валидностью
// const ConditionItemSchema = z.object({
//     field: z.nativeEnum(Fields),
//     operator: z.nativeEnum(Operator),
//     functionCall: z.optional(z.nativeEnum(FunctionCall)),
//     value: z.optional(valueSchema),
// }).superRefine((data, ctx) => {
//     if (!('field' in data)) {
//         return ctx.addIssue({
//             path: ['field'],
//             message: 'Вы не указали поле фильтра',
//             code: ZodIssueCode.custom
//         });
//     }
//     if (!('operator' in data)) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Вы не указали оператор для поля',
//             code: ZodIssueCode.custom
//         });
//     }
//     //operatorsWithoutFunctionAndValue
//     const { field, operator, functionCall, value } = data;

//     // Если оператор равен IS_NULL или IS_NOT_NULL и есть значение или функция, то выбрасываем ошибку.
//     const isHasIndependentOperator = operatorsWithoutFunctionAndValue.some(item => item === operator)
//     const isHasIndependentFunctions = functionsWithoutValue.some(item => item === functionCall)
//     const currentFieldConfig = FieldFunctionOperatorMap[field!];
//     if (isHasIndependentFunctions && value) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Для данной функции нельзя применить значение',
//             code: ZodIssueCode.custom
//         });
//     }
//     if (isHasIndependentOperator && (value || functionCall)) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Для данного операторы вы не можете указать значение или функцию',
//             code: ZodIssueCode.custom
//         });
//     }
//     if (!isHasIndependentOperator && !isHasIndependentFunctions && !value) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Не указано значение для поля',
//             code: ZodIssueCode.custom
//         });
//     }
//     if (!Object.values(currentFieldConfig.available_operators).includes(operator)) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Вы используете оператор недопустимый для этого поля',
//             code: ZodIssueCode.custom
//         });
//     }
//     if (!("available_functions" in currentFieldConfig) && functionCall) {
//         return ctx.addIssue({
//             path: ['operator'],
//             message: 'Для этого поля не предусмотрено использование функций',
//             code: ZodIssueCode.custom
//         });
//     }
//     if ("available_functions" in currentFieldConfig) {
//         if (functionCall && !Object.keys(currentFieldConfig.available_functions).includes(functionCall)) {
//             return ctx.addIssue({
//                 path: ['operator'],
//                 message: 'Вы используете недопустимую функцию для этого поля',
//                 code: ZodIssueCode.custom
//             });
//         }
//     }
// });

// // Обертка для условий (ConditionObject)
// const ConditionObjectSchema = z.object({
//     conditions: z.array(ConditionItemSchema),
//     logicalOperator: LogicalOperatorSchema,
// });

// // Общий фильтр
// const FilterInputSchema = z.object({
//     conditions: z.array(ConditionObjectSchema),
//     logicalOperator: LogicalOperatorSchema,
//     orderBy: z.optional(SortSchema),
// });


// @InputType()
// export class ConditionItem extends createZodDto(ConditionItemSchema) {

//     @Field(() => Fields, { nullable: false })
//     field: Fields

//     @Field(() => Operator, { nullable: false })
//     operator: Operator

//     @Field(() => FunctionCall, { nullable: true })
//     functionCall?: FunctionCall

//     @Field(() => String, { nullable: true })
//     value?: string
// }

// @InputType()
// export class ConditionObject extends createZodDto(ConditionObjectSchema) {
//     @Field(() => [ConditionItem])
//     conditions: ConditionItem[]

//     @Field(() => LogicalOperator)
//     logicalOperator: LogicalOperator
// }

// @InputType()
// export class FilterInput extends createZodDto(FilterInputSchema) {
//     @Field(() => [ConditionObject])
//     conditions: ConditionObject[]

//     @Field(() => LogicalOperator)
//     logicalOperator: LogicalOperator

//     @Field(() => Sort, { nullable: true })
//     orderBy: Sort
// }
