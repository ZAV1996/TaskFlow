import { FieldType, FunctionCall, LogicalOperator, Operator, SortOrder } from "src/filter/inputs/filter.input";

const filter = {
    ID: 1,
    title: "Название",

    conditions: [
        {
            conditions: [
                {
                    field: FieldType.ASSIGNEE,
                    operator: Operator.EQUALS,
                    value: { ID: 1 }
                },
                {
                    field: FieldType.AUTHOR,
                    operator: Operator.IS_NOT_NULL,
                },
                {
                    field: FieldType.AUTHOR,
                    operator: Operator.EQUALS,
                    value: { ID: 1 }
                }
            ],
            logicalOperator: LogicalOperator.AND
        },
        {
            conditions: [
                {
                    field: FieldType.FIX_VERSION,
                    operator: FunctionCall.UNRELEASED_VERSION
                },
                {
                    field: FieldType.FIX_VERSION,
                    operator: Operator.IS_NOT_NULL
                }
            ]
        }
    ],
    logicalOperator: LogicalOperator.AND,
    owner: 1,
    board: 1,
    orderBy: SortOrder.ASC
}
