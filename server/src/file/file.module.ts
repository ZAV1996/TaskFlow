import { Global, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
@Global()
@Module({
  providers: [FileResolver, FileService],
  imports: [
    TypeOrmModule.forFeature([FileEntity])
  ],
  exports: [FileService],
})
export class FileModule { }
