import {
  IsNotEmpty,
  IsString,
  Length,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @Length(2, 40, { message: 'Название задачи должно быть от 2 до 40 символов' })
  title: string;

  @IsString({ message: 'Описание задачи должно быть строкой' })
  @IsOptional()
  @Length(10, 255, {
    message: 'Описание задачи должно быть от 10 до 255 символов',
  })
  description: string;

  @IsBoolean({ message: 'Статус задачи должен быть булевым значением' })
  isCompleted: boolean;
}
