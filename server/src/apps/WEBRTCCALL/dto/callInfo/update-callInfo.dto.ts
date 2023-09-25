import { PartialType } from '@nestjs/mapped-types';
import { CreateCallInfoDto } from './create-callInfo.dto';
import { CallInfoState } from 'src/enum/webrtcCallEvent.enum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCallInfoDto extends PartialType(CreateCallInfoDto) {
    @IsEnum(CallInfoState)
    @ApiProperty()
    state: CallInfoState;
}
