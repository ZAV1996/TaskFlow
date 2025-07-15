import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { ForbiddenException, NotFoundException, UseGuards, } from '@nestjs/common';
import { AccessGuard } from 'src/common/guards/access.guard';
import { Response } from 'express';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateMyProfile } from './dto/update-my-profile.input';
import { GraphQLUpload, FileUpload, Upload } from 'graphql-upload-ts';
import { FileService } from 'src/file/file.service';
import { FileType, RelatedEntityType } from 'src/file/input/upload-file.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService
  ) { }

  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => User)
  async createUser(@Args('CreateUser') createUserInput: CreateUserInput) {
    return await this.usersService.createUser(createUserInput);
  }


  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => User)
  async updateUser(@Args('UpdateUser') updateUserInput: UpdateUserInput, @Context() ctx: Response) {

    return this.usersService.updateUser(updateUserInput);
  }

  @UseGuards(AccessGuard)
  @Mutation(() => User)
  async updateMyProfile(@Args('UpdateMyProfile') updateUserInput: UpdateMyProfile, @Context() ctx: Response) {

    return this.usersService.updateMyProfile(updateUserInput, ctx);
  }


  @UseGuards(AccessGuard, AdminGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('ID', { type: () => Int }) id: number) {
    return await this.usersService.deleteUser(id) ? true : false;
  }
  @UseGuards(AccessGuard)
  @Mutation(() => User)
  async changePassword(@Args('Input', { type: () => ChangePasswordInput }) { ID, ...input }: ChangePasswordInput, @Context() ctx: Response) {
    const session_uuid = ctx.req.cookies.session_uuid;
    const user = await this.getCurrentUser(ctx)
    if (!user)
      throw new NotFoundException("Пользователь не найден")
    if (user.ID !== ID)
      throw new ForbiddenException("Нельзя сменить чужой пароль")
    return await this.usersService.changePassword({ ID, ...input }, session_uuid)
  }


  @UseGuards(AccessGuard)
  @Query(() => [User], { name: 'getAllUsers', nullable: true })
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AccessGuard)
  @Query(() => User, { name: 'getUserByID', nullable: true })
  getUserByID(@Args('ID', { type: () => Int }) id: number) {
    return this.usersService.getUserByID(id);
  }

  @UseGuards(AccessGuard)
  @Query(() => User,)
  getCurrentUser(@Context() ctx: Response) {
    const session_uuid = ctx.req.cookies.session_uuid;
    return this.usersService.getCurrentUser(session_uuid);
  }



  @Mutation(() => User)
  async setAvatar(
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true }) upload: FileUpload,
    @Context() ctx: Response
  ) {
    const uploadedBy = await this.getCurrentUser(ctx);
    const type = FileType.USER_AVATAR;
    const relatedEntityType = RelatedEntityType.USER;
    if (!uploadedBy) throw new Error("Пользователь не найден")
    const relatedEntityId = uploadedBy?.ID
    const uploadImage = await this.fileService.uploadFile(upload, { type, relatedEntityType, uploadedBy, relatedEntityId });
    return await this.usersService.setUserAvatar(uploadImage, ctx)
  }

  // @Mutation(() => UserImageType)
  // async uploadImage(
  //   @Args({ name: 'file', type: () => GraphQLUpload }) { 
  //     filename, 
  //     createReadStream, 
  //     mimetype }: FileUpload, 
  //     @Context() ctx: Response) {
  //   const user = await this.getCurrentUser(ctx);
  //   if (!user) throw new NotFoundException("Пользователь не найден");
  //   const fileExt = path.extname(filename);
  //   const newFilename = `${uuidv4()}${fileExt}`;
  //   const uploadPath = path.join(__dirname, '../../', 'uploads/usersImages', newFilename);
  //   createReadStream().pipe(createWriteStream(uploadPath))
  //   return await this.imagesService.uploadImage({
  //     user: user.ID,
  //     path: `${env.SERVER_HOST}:${env.SERVER_PORT}/uploads/usersImages/${newFilename}`,
  //     fileName: filename,
  //     mimetype
  //   })
  // }
}
