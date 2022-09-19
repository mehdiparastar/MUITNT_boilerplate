import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  readonly title: string;

  @IsString()
  @MaxLength(300)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsString()
  @IsNotEmpty()
  readonly date_posted: string;
}
