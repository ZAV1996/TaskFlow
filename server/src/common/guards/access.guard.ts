import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { env } from "node:process";

import { RedisService } from "src/redis/redis.service";


@Injectable()
export class AccessGuard implements CanActivate {
    constructor(
        private redisService: RedisService,
    ) { }

    async canActivate(context: ExecutionContext) {
        const session_uuid = context.getArgByIndex(2).req.cookies.session_uuid;

        if (!session_uuid) {
            throw new UnauthorizedException('Сессия не найдена');
        }

        const sessionExists = await this.redisService.exists(`session:${session_uuid}`);
        if (!sessionExists) {
            throw new UnauthorizedException('Сессия истекла');
        }
        return true;
    }
}