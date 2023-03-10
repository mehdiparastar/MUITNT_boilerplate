import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @Length(1)
  message: string;

  @ApiProperty()
  @IsNumber()
  roomId: number;
}
