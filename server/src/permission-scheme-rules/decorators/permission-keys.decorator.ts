import { Reflector } from "@nestjs/core";
import { PermissionSchemeKeys } from "../entities/permission-scheme-rule.entity";

export const PermissionKeys = Reflector.createDecorator<PermissionSchemeKeys[]>()