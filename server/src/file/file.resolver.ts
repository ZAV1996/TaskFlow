import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileEntity } from './entities/file.entity';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { FileType, RelatedEntityType } from './input/upload-file.input';


@Resolver(() => FileEntity)
export class FileResolver {
  constructor(private readonly fileService: FileService) { }

  @Mutation(() => FileEntity)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload, nullable: true }) file: FileUpload,
    @Args({ type: () => FileType, name: 'type' }) type: FileType,
    @Context() ctx: any,
    @Args({ name: 'relatedEntityType', type: () => RelatedEntityType, nullable: true }) relatedEntityType?: RelatedEntityType,
    @Args({ name: 'relatedEntityId', type: () => Int, nullable: true }) relatedEntityId?: number,
  ): Promise<FileEntity> {
    const user = ctx.req.user;
    return this.fileService.uploadFile(file, {
      type,
      relatedEntityType,
      relatedEntityId,
      uploadedBy: user,
    });
  }

  @Mutation(() => Boolean)
  async deleteFile(@Args({name:'fileId', type: ()=>Int}) ID: number): Promise<boolean> {
    return this.fileService.deleteFile(ID);
  }
}
