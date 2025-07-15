import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { ActivityLogService } from "./activity-log.service";
import { GqlExecutionContext } from "@nestjs/graphql";
import { getClientIp } from "src/common/utils/get-client-ip";
import { RedisService } from "src/redis/redis.service";
import { TSession } from "src/session/session.service";

@Injectable()
export class ActivityLogInterceptor implements NestInterceptor {
    constructor(
        private activityLogService: ActivityLogService,
        private redisService: RedisService
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler) {
        const ctx = GqlExecutionContext.create(context);
        const handler = context.getHandler();
        const handlerName = handler.name;
        const ipAddress = getClientIp(ctx.getContext().req);
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid;

        let user: User | undefined;
        let argument: string | undefined;

        const session = await this.redisService.get<TSession>(`session:${session_uuid}`);
        if (session && JSON.stringify(session.user) !== '{}') {
            user = session.user as User;
        }
        argument = JSON.stringify(ctx.getArgs()) === '{}' ? undefined : JSON.stringify(ctx.getArgs());

        const sensitiveMethods = ["changePassword", "login", "updatePass", "ConfirmToken"];
        if (sensitiveMethods.includes(handlerName)) {
            argument = undefined;
        }
        await this.activityLogService.addActivityLog({
            argument,
            user,
            handlerName,
            ipAddress
        });

        return next.handle();
    }
}