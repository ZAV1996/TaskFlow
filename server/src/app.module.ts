import 'dotenv/config'
import { forwardRef, Module, } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { GroupsModule } from './groups/groups.module';
import { ProjectComponentsModule } from './project-components/project-components.module';
import { WorkflowModule } from './workflow/workflow.module';
import { InitModule } from './init/init.module';
import { StatusModule } from './status/status.module';
import { CondModule } from './cond/cond.module';
import { IssuesModule } from './issues/issues.module';
import { TransitionModule } from './transition/transition.module';
import { RiskModule } from './risk/risk.module';
import { FilterModule } from './filter/filter.module';
import { BoardModule } from './board/board.module';
import { ColumnBoardModule } from './column-board/column-board.module';
import { PermissionSchemeModule } from './permission-scheme/permission-scheme.module';
import { ProjectRoleModule } from './project-role/project-role.module';
import { PermissionSchemeRulesModule } from './permission-scheme-rules/permission-scheme-rules.module';
import { ProjectRoleMembersModule } from './project-role-members/project-role-members.module';
import { IssueLinkModule } from './issue-link/issue-link.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Request, Response } from 'express';
import { FileModule } from './file/file.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ActivityLogInterceptor } from './activity-log/activity-log.interceptor';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisService } from './redis/redis.service';
import { SharedModule } from './shared/shared.module';
import { RedisModule } from './redis/redis.module';
import { SmtpSendlerModule } from './smtp-sendler/smtp-sendler.module';
import { CryptoModule } from './crypto-module/crypto.module';
import { SessionModule } from './session/session.module';
import { IssueTypeModule } from './issue-type/issue-type.module';

export interface GqlContext {
  req: Request;
  res: Response;
}
const HOST = process.env.HOST
const PORT = Number(process.env.PORT)
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DB = process.env.DB
const NODE_ENV = process.env.NODE_ENV !== 'production'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: HOST,
      port: PORT,
      username: USERNAME,
      password: PASSWORD,
      database: DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: false,
      cache: {
        type: 'redis',
        options: {
          database: 1,
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
          },
        },
        duration: 30000,
      },
      synchronize: true, //В проде надо отключить чтобы ненароком не потерять данные
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: "/api/",
      buildSchemaOptions: {
        dateScalarMode: "isoDate",
      },
      introspection: NODE_ENV,
      csrfPrevention: false,
      context: ({ req, res }: { req: Request; res: Response }): GqlContext => ({
        req,
        res,
      }),
    }),
    ///////////////////////////////

    ProjectsModule,
    WorkflowModule,
    InitModule,
    StatusModule,
    CondModule,
    IssuesModule,
    ProjectComponentsModule,
    TransitionModule,
    RiskModule,
    FilterModule,
    BoardModule,
    ColumnBoardModule,
    PermissionSchemeModule,
    ProjectRoleModule,
    PermissionSchemeRulesModule,
    ProjectRoleMembersModule,
    IssueLinkModule,
    ActivityLogModule,
    SharedModule,

    //Global modules
    SessionModule,
    CryptoModule,
    RedisModule,
    SmtpSendlerModule,
    FileModule,
    AuthModule,
    UsersModule,
    GroupsModule,
    IssueTypeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ActivityLogInterceptor,
    },
  ],
})
export class AppModule { }
