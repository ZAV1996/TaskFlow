import { Resolver, Query, Mutation, Args, Context, Info } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { Res, UseGuards, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { RegisterInput } from './dto/register.input';
import { ConfirmInput } from './dto/confirm.input';
import { LoginInput } from './dto/login.input';
import { ForgotPassInput } from './dto/forgot.dto';
import { SetNewPassForgot } from './dto/set-new-pass.input';
import { AccessGuard } from 'src/common/guards/access.guard';
import { ZodValidationPipe } from 'nestjs-zod';
import { SessionType } from './types/session.type';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Mutation(() => String)
  async register(@Args({ type: () => RegisterInput, name: "RegisterInput" }) registerDTO: RegisterInput) {
    return await this.authService.register(registerDTO);
  }

  @Mutation(() => String, { nullable: true })
  async confirm(@Args({ name: "ConfirmToken", type: () => ConfirmInput }) confirmToken: ConfirmInput) {
    return await this.authService.confirm(confirmToken)
  }

  @UsePipes(ZodValidationPipe)
  @Mutation(() => User, { nullable: false })
  async login(@Args({ type: () => LoginInput, name: "LoginInput" }) loginInput: LoginInput, @Context() context: { res: Response, req: Request }) {
    return await this.authService.login(loginInput, context);
  }



  @UsePipes(ZodValidationPipe)
  @UseGuards(AccessGuard)
  @Mutation(() => Boolean, { nullable: true })
  async logout(@Context() ctx: Response) {
    return this.authService.logout(ctx);
  }

  @UsePipes(ZodValidationPipe)
  @Mutation(() => String, { nullable: true })
  async forgot(@Args({ type: () => ForgotPassInput, name: "ForgotPassInput" }) forgotPassInput: ForgotPassInput) {
    return await this.authService.forgot(forgotPassInput);
  }

  @UsePipes(ZodValidationPipe)
  @Mutation(() => String, { nullable: true })
  async updatePass(@Args({ type: () => SetNewPassForgot, name: "ForgotPass" }) forgotInput: SetNewPassForgot) {
    const user = await this.authService.updateForgotPass(forgotInput);
    return typeof user === "object" ? "Пароль успешно обновлен" : user
  }
}
