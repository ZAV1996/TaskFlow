import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { AccessGuard } from 'src/common/guards/access.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Global()
@Module({
  providers: [AuthResolver, AuthService, AccessGuard],
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule { }
