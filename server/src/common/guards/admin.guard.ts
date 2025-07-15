import { ForbiddenError } from "@nestjs/apollo";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CryptoService } from "src/crypto-module/crypto.service";
import { Group } from "src/groups/entities/group.entity";
import { GroupRelations } from "src/groups/groups.service";
import { SessionService } from "src/session/session.service";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
        private sessionService: SessionService
    ) { }

    async canActivate(context: ExecutionContext) {
        const accessToken = context.getArgByIndex(2).req.cookies.session_uuid;
        const session = await this.sessionService.getSessionBySessionUUID(accessToken)!
        const user = session!.user!
        const group = await this.groupRepo.findOne({ where: { group_name: "Administrators" }, relations: [GroupRelations.USERS] })
        if (group) {
            for (const member of group.users) {
                if (member.ID === user.ID) {
                    return true
                }
            }
        }
        throw new ForbiddenError("У вас нет прав доступа к данному функционалу")
    }

}