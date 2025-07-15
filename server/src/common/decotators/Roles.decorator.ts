import { Reflector } from "@nestjs/core";
export enum RolesEnum {
    ADMINISTRATORS = "Administrators",
    USERS = "Users"
}
export const Roles = Reflector.createDecorator<RolesEnum>()