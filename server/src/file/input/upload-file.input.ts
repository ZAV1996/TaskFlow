import { InputType, Field } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';

import { z } from 'zod';


export enum FileType {
  USER_AVATAR = 'USER-AVATAR',
  USER_PHOTO = 'USER_PHOTO',
  ISSUE_ATTACHMENT = 'TASK_ATTACHMENT',
  COMMENT_ATTACHMENT = 'COMMENT_ATTACHMENT',
  PROJECT_IMAGE = 'PROJECT_IMAGE',
  SYSTEM_IMAGE = 'SYSTEM_IMAGE'
}

export enum RelatedEntityType {
  USER = 'USER',
  ISSUE = 'ISSUE',
  COMMENT = 'COMMENT',
  PROJECT = 'PROJECT',
  SYSTEM = 'SYSTEM'
}

export enum MimeType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
  SVG = 'image/svg+xml',
  PDF = 'application/pdf',
  ZIP = 'application/zip',
  MP4 = 'video/mp4',
}

export function toMimeType(mime: string) {
  if (!Object.values(MimeType).includes(mime as MimeType)) {
    throw new Error('Не поддерживаемый тип файла')
  }
  return mime as MimeType
}

export const uploadFileInputSchema = z.object({
  type: z.nativeEnum(FileType),
  relatedEntityType: z.nativeEnum(RelatedEntityType).optional(),
  relatedEntityId: z.number().optional(),
}).superRefine((val, ctx) => {
  const { type, relatedEntityType, relatedEntityId } = val;

  const fileEntityRules: Record<FileType, { requiredEntity: RelatedEntityType, allowId?: boolean }> = {
    [FileType.USER_AVATAR]: { requiredEntity: RelatedEntityType.USER },
    [FileType.USER_PHOTO]: { requiredEntity: RelatedEntityType.USER },
    [FileType.ISSUE_ATTACHMENT]: { requiredEntity: RelatedEntityType.ISSUE },
    [FileType.COMMENT_ATTACHMENT]: { requiredEntity: RelatedEntityType.COMMENT },
    [FileType.PROJECT_IMAGE]: { requiredEntity: RelatedEntityType.PROJECT },
    [FileType.SYSTEM_IMAGE]: { requiredEntity: RelatedEntityType.SYSTEM, allowId: false },
  };
  const rule = fileEntityRules[type];
  if (rule) {
    if (relatedEntityType !== rule.requiredEntity) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['relatedEntityType'],
        message: `Тип файла ${type} может быть связан только с сущностью ${rule.requiredEntity}`,
      });
    }
    if (rule.allowId === false && relatedEntityId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['relatedEntityId'],
        message: `Тип файла ${type} не должен иметь relatedEntityId`,
      });
    }
  }
});

@InputType()
export class UploadFileInput {

  @Field(() => FileType)
  type: FileType;

  @Field({ nullable: true })
  relatedEntityType?: RelatedEntityType;

  @Field({ nullable: true })
  relatedEntityId?: number;
}
