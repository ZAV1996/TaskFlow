import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-ts';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { FileType, MimeType, RelatedEntityType, toMimeType } from './input/upload-file.input';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity) private fileRepo: Repository<FileEntity>,
  ) { }

  async uploadFile(
    file: FileUpload,
    options: {
      type: FileType;
      relatedEntityType?: RelatedEntityType;
      relatedEntityId?: number;
      uploadedBy?: User;
    },
  ): Promise<FileEntity> {
    const { filename, createReadStream, mimetype } = file;
    console.log(typeof file);

    const ext = path.extname(filename);

    const uuid = uuidv4();
    const newFilename = `${uuid}${ext}`;
    let safeMimeType: MimeType;

    try {

      safeMimeType = toMimeType(mimetype)
    } catch (e) {
      throw new Error(`Не допустимый MIME-тип: ${mimetype}`)
    }

    const folder = options.relatedEntityType || options.type;

    const subfolder = options.relatedEntityId?.toString() || 'common';
    const relativePath = path.join('uploads', folder, subfolder);
    const uploadDir = path.join(__dirname, '..', '..', relativePath);
    const uploadPath = path.join(uploadDir, newFilename);

    await fs.promises.mkdir(uploadDir, { recursive: true });
    const writeStream = fs.createWriteStream(uploadPath);
    const readStream = createReadStream();
    await new Promise<void>((resolve, reject) => {
      readStream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });

    //createReadStream().pipe(fs.createWriteStream(uploadPath))

    const stat = await fs.promises.stat(uploadPath);

    const fileEntity = this.fileRepo.create({
      originalName: filename,
      filename: newFilename,
      mimetype: safeMimeType,
      size: stat.size,
      path: `/${relativePath}/${newFilename}`,
      url: `${relativePath}/${newFilename}`,
      type: options.type,
      relatedEntityType: options.relatedEntityType,
      relatedEntityId: options.relatedEntityId,
      uploadedBy: options.uploadedBy,
    });

    return this.fileRepo.save(fileEntity);
  }

  async deleteFile(ID: number): Promise<boolean> {
    const file = await this.fileRepo.findOneBy({ ID });
    if (!file) return false;

    const absolutePath = path.join(__dirname, '..', '..', file.path);
    try {
      await fs.promises.unlink(absolutePath);
    } catch (err) {
      console.warn(`Файл не найден в FS: ${absolutePath}`);
    }
    await this.fileRepo.delete({ ID });
    return true;
  }

  async getFilesByEntity(
    relatedEntityType: RelatedEntityType,
    relatedEntityId: number,
    type?: FileType
  ): Promise<FileEntity[]> {
    const where: any = {
      relatedEntityType,
      relatedEntityId,
    };
    if (type) where.type = type;

    return this.fileRepo.find({ where });
  }
}
