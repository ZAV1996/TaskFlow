import { Query, Resolver } from "@nestjs/graphql";
import { InitService } from "./init.service";
import { PermissionKeyType } from "./types/PermissionKeys.type";

@Resolver()
export class InitResolver {
    constructor(
        private initService: InitService
    ) { }
    @Query(() => [PermissionKeyType])
    async getPermissionKeys() {
        return await this.initService.getGermissionsKeys()
    }
}