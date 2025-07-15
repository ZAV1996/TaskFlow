import { GqlDate, User } from "src/users/entities/user.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { TSession } from "src/session/session.service";
@ObjectType()
export class DeviceType {
    @Field(() => String)
    userAgent: string;

    @Field(() => String)
    ip: string;
}
@ObjectType()
export class SessionType implements TSession {
    @Field(() => String)
    deviceId: string;

    @Field(() => DeviceType)
    device: DeviceType

    @Field(() => String)
    session_uuid: string;

    @Field(() => User)
    user: User;

    @Field(() => Int)
    expireIn: number;

    @Field(() => GqlDate)
    createdAt: Date;
}
