import { Global, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';

@Global()
@Module({
  providers: [SessionService, SessionResolver],
  exports: [SessionService, SessionResolver],
})
export class SessionModule { }
