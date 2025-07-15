import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { PermissionKey } from './entities/PermissionKeys.entity';
import { Repository } from 'typeorm';
import { PermissionSchemeKeys, PermissionSchemeDescriptions, PermissionSchemeNames } from 'src/permission-scheme-rules/entities/permission-scheme-rule.entity';

@Injectable()
export class InitService implements OnModuleInit {
    constructor(
        private groupService: GroupsService,
        @InjectRepository(PermissionKey) private readonly permissionKeyRepo: Repository<PermissionKey>
    ) { }
    async onModuleInit() {
        const groups = await this.groupService.getAllGroups();
        if (groups.length === 0) {
            await this.groupService.createGroup({ group_name: "Administrators", description: "Группа администраторов" })
            await this.groupService.createGroup({ group_name: "Users", description: "Default group users" })
        }

        const keys = await this.permissionKeyRepo.find()
        if (keys.length === 0) {
            const keys = Object.values(PermissionSchemeKeys).map(key => ({ permissionKey: key }));
            const names = Object.values(PermissionSchemeNames).map(name => ({ permissionName: name }));
            const rulesDescriptionsToCreate = Object.values(PermissionSchemeDescriptions).map((description, index) => ({ description, ...keys[index], ...names[index] }));
            await this.permissionKeyRepo.save(rulesDescriptionsToCreate)
        }

    }
    async getGermissionsKeys() {
        return await this.permissionKeyRepo.find()
    }
}
