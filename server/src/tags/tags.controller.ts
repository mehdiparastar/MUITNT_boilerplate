import {
  Body,
  Controller,
  Delete,
  Get, Param, Post, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { appNameEnum } from 'src/enum/appName.enum';
import { AccessTokenGuard } from '../authentication/guards/accessToken.guard';
import { Roles } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { UserRoles } from '../enum/userRoles.enum';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.middleware';
import { User } from '../users/entities/user.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
  ) { }

  @Post('create')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  @Serialize(TagDto)
  async create(@CurrentUser() user: User, @Body() body: CreateTagDto): Promise<TagDto> {
    return this.tagsService.create(
      user,
      body.tag,
      body.appName
    );
  }

  @Get('all/:appName')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser, UserRoles.admin)
  @Serialize(TagDto)
  async findAll(@Param('appName') appName: appNameEnum) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.tagsService.findAll(appName);
  }

  @Delete('delete-tag/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.superUser)
  @Serialize(TagDto)
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.tagsService.removeTag(user, parseInt(id));
  }
}
