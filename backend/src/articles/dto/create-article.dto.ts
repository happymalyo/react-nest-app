import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  nom_article: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;
}
