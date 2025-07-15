import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { InputID, InputIDSchema } from 'src/workflow/inputs/create.input';
import { z, ZodAny } from 'zod';
export enum Operator {
    EQUALS = '=',
    NOT_EQUALS = '!=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    IN = 'IN',
    NOT_IN = 'NOT IN',
    IS_NULL = 'IS NULL',
    IS_NOT_NULL = 'IS NOT NULL',
    LIKE = 'LIKE'
}
export enum FieldType {
    PROJECT = 'project',
    TITLE = 'title',
    ASSIGNEE = 'assignee',
    AUTHOR = 'author',
    CHILDREN_ISSUES = 'childrenIssues',
    PARENT_ISSUE = 'parentIssue',
    COMPONENTS = 'components',
    DESCRIPTION = 'description',
    FIX_VERSION = 'fixVersion',
    ISSUE_TYPE = 'issueType',
    PRIORITY = 'priority',
    KEY = 'key',
    ID = 'ID',
    ISSUE_NUM = 'issueNum'
}
export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export enum LogicalOperator {
    AND = "AND",
    OR = "OR"
}
export enum FunctionCall {
    CURRENT_USER = "CURRENT_USER",
    UPDATED_BY = "UPDATED_BY",
    CLOSED_SPRINTS = "CLOSED_SPRINTS",
    MEMBERS_OF = "MEMBERS_OF",
    NOW = "NOW",
    RELEASED_VERSIONS = "RELEASED_VERSIONS",
    UNRELEASED_VERSION = "UNRELEASED_VERSION"
}

Object.entries({
    Operator,
    FieldType,
    SortOrder,
    LogicalOperator,
    FunctionCall,
}).forEach(([name, enumObj]) => registerEnumType(enumObj, { name }));

type FieldConfig = {
    allowedOperators: Operator[];
    allowedFunctions?: FunctionCall[];
    valueSchema: z.ZodTypeAny;
};
type ValueConfig = {
    valueType?: z.ZodTypeAny
}
const VALUE_CONFIGS: Record<Operator, ValueConfig> = {
    [Operator.LIKE]: {
        valueType: z.string()
    },
    [Operator.EQUALS]: {
        valueType: z.union([z.string(), InputIDSchema, z.number()])
    },
    [Operator.NOT_EQUALS]: {
        valueType: z.union([z.string(), InputIDSchema, z.number()])
    },
    [Operator.GREATER_THAN]: {
        valueType: z.number()
    },
    [Operator.GREATER_THAN_OR_EQUAL]: {
        valueType: z.number()
    },
    [Operator.LESS_THAN]: {
        valueType: z.number()
    },
    [Operator.LESS_THAN_OR_EQUAL]: {
        valueType: z.number()
    },
    [Operator.IN]: {
        valueType: z.union([z.array(InputIDSchema), z.array(z.number())])
    },
    [Operator.NOT_IN]: {
        valueType: z.union([z.array(InputIDSchema), z.array(z.number())])
    },
    [Operator.IS_NULL]: {
        valueType: z.null()
    },
    [Operator.IS_NOT_NULL]: {
        valueType: z.null()
    },
}

const FIELD_CONFIGS: Record<FieldType, FieldConfig> = {
    [FieldType.ID]: {
        allowedOperators: [Operator.EQUALS, Operator.NOT_EQUALS, Operator.IN, Operator.NOT_IN],
        valueSchema: z.union([InputIDSchema, z.array(InputIDSchema)]),
    },
    [FieldType.PROJECT]: {
        allowedOperators: [Operator.EQUALS, Operator.NOT_EQUALS, Operator.IN, Operator.NOT_IN],
        valueSchema: z.union([InputIDSchema, z.array(InputIDSchema)]),
    },
    [FieldType.TITLE]: {
        allowedOperators: [Operator.EQUALS, Operator.NOT_EQUALS, Operator.LIKE],
        valueSchema: z.string(),
    },
    [FieldType.ASSIGNEE]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        allowedFunctions: [FunctionCall.CURRENT_USER, FunctionCall.MEMBERS_OF],
        valueSchema: z.union([InputIDSchema, z.array(InputIDSchema)]),
    },
    [FieldType.AUTHOR]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        allowedFunctions: [FunctionCall.CURRENT_USER, FunctionCall.MEMBERS_OF],
        valueSchema: InputIDSchema,
    },
    [FieldType.CHILDREN_ISSUES]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.PARENT_ISSUE]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.COMPONENTS]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.DESCRIPTION]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
            Operator.LIKE
        ],
        valueSchema: z.string()
    },
    [FieldType.FIX_VERSION]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        allowedFunctions: [
            FunctionCall.UNRELEASED_VERSION,
            FunctionCall.RELEASED_VERSIONS
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.ISSUE_TYPE]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.PRIORITY]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.IS_NULL,
            Operator.IS_NOT_NULL,
        ],
        valueSchema: z.array(InputIDSchema)
    },
    [FieldType.KEY]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.LIKE
        ],
        valueSchema: z.string()
    },
    [FieldType.ISSUE_NUM]: {
        allowedOperators: [
            Operator.EQUALS,
            Operator.NOT_EQUALS,
            Operator.IN,
            Operator.NOT_IN,
            Operator.GREATER_THAN,
            Operator.GREATER_THAN_OR_EQUAL,
            Operator.LESS_THAN,
            Operator.LESS_THAN_OR_EQUAL,
        ],
        valueSchema: z.union([z.number(), z.array(z.number())])
    }
};



const operatorsWithoutValue = [Operator.IS_NULL, Operator.IS_NOT_NULL];
const functionsWithoutValue = [FunctionCall.NOW, FunctionCall.CURRENT_USER];


const validateOperator = (field: FieldType, operator: Operator, ctx: z.RefinementCtx) => {
    const config = FIELD_CONFIGS[field];
    if (!config.allowedOperators.includes(operator)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Оператор ${operator} недопустим для поля ${field}`,
            path: ['operator'],
        });
    }
};

const validateFunction = (field: FieldType, fnCall: FunctionCall | undefined, ctx: z.RefinementCtx) => {
    const config = FIELD_CONFIGS[field];
    if (fnCall && !config.allowedFunctions?.includes(fnCall)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Функция ${fnCall} не разрешена для поля ${field}`,
            path: ['functionCall'],
        });
    }
};

const validateValue = (
    operator: Operator,
    fnCall: FunctionCall | undefined,
    value: unknown,
    field: FieldType,
    ctx: z.RefinementCtx
) => {
    const config = FIELD_CONFIGS[field];
    const valueConfig = VALUE_CONFIGS[operator]

    if (operatorsWithoutValue.includes(operator) && value !== undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Значение недопустимо для оператора ${operator}`,
            path: ['value'],
        });
    }
    if (fnCall && functionsWithoutValue.includes(fnCall) && value !== undefined) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Значение недопустимо для функции ${fnCall}`,
            path: ['value'],
        });
    }

    if (!operatorsWithoutValue.includes(operator) && !functionsWithoutValue.includes(fnCall!)) {
        try {
            valueConfig.valueType?.parse(value)
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Недопустимый тип значения для оператора ${operator}`,
                path: ['value'],
            });
        }
        try {
            config.valueSchema.parse(value);
        } catch (e) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Недопустимый тип значения для поля ${field}`,
                path: ['value'],
            });
        }
    }
};

// Базовые схемы
const ConditionItemSchema = z.object({
    field: z.nativeEnum(FieldType),
    operator: z.nativeEnum(Operator),
    functionCall: z.optional(z.nativeEnum(FunctionCall)),

    valueNumber: z.number().optional(),
    valueArrayNumber: z.array(z.number()).optional(),
    valueString: z.string().optional(),
    valueInputID: InputIDSchema.optional(),
    valueInputIDArray: z.array(InputIDSchema).optional(),
}).superRefine((data, ctx) => {
    const { field, operator, functionCall, valueInputID, valueInputIDArray, valueNumber, valueString, valueArrayNumber } = data;
    const values = [
        { key: 'valueInputID', value: valueInputID },
        { key: 'valueInputIDArray', value: valueInputIDArray },
        { key: 'valueNumber', value: valueNumber },
        { key: 'valueString', value: valueString },
        { key: 'valueArrayNumber', value: valueArrayNumber },
    ];

    let filledValues = values.filter(value => value.value != undefined);
    if (filledValues.length > 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Можно заполнить только одно из полей: valueInputID, valueInputIDArray, valueNumber, valueString',
            path: ['value'],
        });
        return;
    }
    let value: unknown | undefined = undefined;
    if (filledValues.length === 1) {
        value = filledValues[0].value;
    }
    validateOperator(field, operator, ctx);
    validateFunction(field, functionCall, ctx);
    validateValue(operator, functionCall, value, field, ctx);
});

const ConditionGroupSchema = z.object({
    conditions: z.array(ConditionItemSchema),
    logicalOperator: z.nativeEnum(LogicalOperator),
});
const OrderByInputSchema = z.object({
    field: z.nativeEnum(FieldType),
    orderBy: z.optional(z.nativeEnum(SortOrder)),

})
const FilterSchema = z.object({
    ID: z.number(),
    title: z.string(),
    conditions: z.array(ConditionGroupSchema),
    logicalOperator: z.nativeEnum(LogicalOperator),
    owner: InputIDSchema,
    board: InputIDSchema.optional(),
    orderBy: OrderByInputSchema,
});

@InputType()
export class OrderByInput extends createZodDto(OrderByInputSchema) {
    @Field(() => FieldType)
    field!: FieldType;

    @Field(() => SortOrder)
    orderBy?: SortOrder;
}

@InputType()
export class ConditionItem extends createZodDto(ConditionItemSchema) {
    @Field(() => FieldType)
    field!: FieldType;

    @Field(() => Operator, { nullable: false })
    operator: Operator;

    @Field(() => FunctionCall, { nullable: true })
    functionCall?: FunctionCall;

    @Field(() => String, { nullable: true })
    valueString?: string;

    @Field(() => InputID, { nullable: true })
    valueInputID: InputID

    @Field(() => [InputID], { nullable: true })
    valueInputIDArray: InputID[]

    @Field(() => Int, { nullable: true })
    valueNumber: number

    @Field(() => [Int], { nullable: true })
    valueArrayNumber: number[]
}

@InputType()
export class ConditionGroup extends createZodDto(ConditionGroupSchema) {
    @Field(() => [ConditionItem])
    conditions!: ConditionItem[];

    @Field(() => LogicalOperator)
    logicalOperator!: LogicalOperator;
}

@InputType()
export class FilterInput extends createZodDto(FilterSchema.omit({ ID: true })) {
    @Field(() => String)
    title: string

    @Field(() => [ConditionGroup])
    conditions!: ConditionGroup[];

    @Field(() => LogicalOperator)
    logicalOperator!: LogicalOperator;

    @Field(() => InputID)
    owner: InputID

    @Field(() => InputID, { nullable: true })
    board: InputID

    @Field(() => OrderByInput, { nullable: true })
    orderBy: OrderByInput;
}

