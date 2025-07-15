import { NotFoundException, UseGuards, UsePipes } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ZodValidationPipe } from "nestjs-zod";
import { SessionType } from "src/auth/types/session.type";
import { AccessGuard } from "src/common/guards/access.guard";
import { SessionService } from "./session.service";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

@Resolver()
export class SessionResolver {
    constructor(
        private readonly sessionService: SessionService,
        private readonly userService: UsersService

    ) { }
    @UseGuards(AccessGuard)
    @Query(() => [SessionType], { nullable: true })
    async getUserSessions(@Args('email') email: string) {
        const sessions = await this.sessionService.getAllSessionsByEmail(email);
        return sessions
    }

    @UsePipes(ZodValidationPipe)
    @UseGuards(AccessGuard)
    @Query(() => [SessionType], { nullable: true })
    async getCurrentUserSessions(@Context() context: { req: Request }) {
        const session_uuid = context.req.cookies.session_uuid;
        const user = await this.userService.getCurrentUser(session_uuid);
        await this.sessionService.delExpiredSessionsFromHash(user.email)
        return await this.sessionService.getAllSessionsByEmail(user.email);

    }
    @UsePipes(ZodValidationPipe)
    @UseGuards(AccessGuard)
    @Query(() => SessionType, { nullable: true })
    async getCurrentUserSession(@Context() context: { req: Request }) {
        const session_uuid = context.req.cookies.session_uuid;
        const session = await this.sessionService.getSessionBySessionUUID(session_uuid);
        return session
    }


    //TODO - сделать завершение только своих сессий, либо любой только для админа в гарде.
    @UsePipes(ZodValidationPipe)
    @UseGuards(AccessGuard)
    @Mutation(() => Boolean)
    async kill_session(@Args("session_uuid") session_uuid: string) {
        const email = await this.sessionService.getEmailSessionFromHash(session_uuid);
        if (!email) throw new NotFoundException("С данной сессией нет связанных аккаунтов")
        await this.sessionService.deleteSessionFromHash(email, session_uuid)
        return await this.sessionService.kill_session(session_uuid);
    }

    @UsePipes(ZodValidationPipe)
    @UseGuards(AccessGuard)
    @Mutation(() => Boolean)
    async kill_all_sessions(@Context() context: { req: Request }) {
        const session_uuid = context.req.cookies.session_uuid;
        const session = await this.sessionService.kill_sessions_without_current(session_uuid);
        return session
    }
}