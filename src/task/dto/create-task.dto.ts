import {
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsInt,
  IsPositive,
  IsArray,
  IsEnum,
  Matches,
  MinLength,
  IsUrl,
  IsUUID,
} from 'class-validator';

import { StartWith } from 'src/common/decorators/start-with.decorator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
  OTHER = 'other',
}

export class CreateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @StartWith('Task: ', { message: 'Название задачи должно начинаться с Task' })
  @Length(2, 40, { message: 'Название задачи должно быть от 2 до 40 символов' })
  title: string;

  @IsString({ message: 'Описание задачи должно быть строкой' })
  @IsOptional()
  @Length(10, 255, {
    message: 'Описание задачи должно быть от 10 до 255 символов',
  })
  description: string;

  @IsInt({ message: 'Приоритет задачи должен быть целым числом' })
  @IsPositive({ message: 'Приоритет задачи должен быть положительным числом' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Теги задачи должны быть массивом' })
  @IsEnum(TaskTag, { each: true, message: 'Недопустимый тег' })
  @IsOptional()
  tags: TaskTag[];

  @IsOptional()
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, {
    message:
      'Пароль должен содержать хотя бы одну заглавную букву и одну цифру',
  })
  password: string;

  @IsOptional()
  @IsUrl(
    {
      // protocols: ['https'],
      // require_protocol: true,
      // require_port: false,
      require_valid_protocol: true,
      host_whitelist: ['google.com', 'youtube.com'],
      host_blacklist: ['facebook.com', 'twitter.com'],
    },
    { message: 'Некорректный URL' },
  )
  websiteUrl: string;

  @IsOptional()
  @IsUUID('4', { message: 'Некорректный UUID' })
  userId: string;
}
