import { IsString, IsNumber, IsUUID, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsUUID('4')
  movieId: string;
}
