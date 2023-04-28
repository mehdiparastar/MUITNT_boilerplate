import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createHash } from 'crypto';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { strToBool } from 'src/helperFunctions/strToBool';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TagDto } from 'src/tags/dto/tag.dto';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { PaginationFilesDto } from '../FILE/dto/file/pagination-files.dto';
import { MovieFileDto } from './dto/movie/movie.dto';
import { MoviesService } from './movies.service';
import { MovieFileValidationPipe } from './validation.pipe';

@Controller('movies_app')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('uploads')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserML)
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          // 👈 this property
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFiles(
    @CurrentUser() user: User,
    @Body('tags') tags_: any,
    @Body('private') private__: any,
    @UploadedFiles(MovieFileValidationPipe) files: Array<Express.Multer.File>,
  ) {
    const tags: TagDto[][] = (files.length > 1 ? tags_ : [tags_]).map((item) =>
      JSON.parse(item),
    );
    const private_: boolean[] = (
      files.length > 1 ? private__ : [private__]
    ).map((item) => strToBool(item));

    const res = await this.moviesService.uploads(
      files.map((file, index) => {
        const hashSum = createHash('sha256');
        hashSum.update(file.buffer);
        const fileHash = hashSum.digest('hex');

        return {
          ...file,
          fileHash,
          owner: user,
          tags: (tags && tags[index]) || [],
          private: private_[index],
        };
      }),
    );
    return res;
  }

  @Get('all-files')
  @UseGuards(AccessTokenGuard)
  @Serialize(PaginationFilesDto)
  async getAllFiles(
    @CurrentUser() user: User,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
    @Query('isPrivate') isPrivate: string,
    @Query('tagsFilter') tagsFilter: string | undefined,
  ) {
    return await this.moviesService.findAll(
      parseInt(skip),
      parseInt(limit),
      strToBool(isPrivate),
      tagsFilter
        ? tagsFilter.split(',').map((item) => parseInt(item))
        : undefined,
      user,
    );
  }

  @Get('get-file/:id')
  @UseGuards(AccessTokenGuard)
  async getFile(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const record = await this.moviesService.findOneById(parseInt(id));

    if (
      (record.private && user.id === record.owner.id) ||
      record.private === false
    ) {
      // const file = createReadStream(join(process.cwd(), 'package.json'))
      res.set({
        'Content-Type': record.type,
        'Content-Disposition': `attachment; filename=${record.name}`,
      });

      return new StreamableFile(record.fileBuffer.file);
    }
    throw new UnauthorizedException();
  }

  @Delete('delete-file/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(MovieFileDto)
  async removeFile(@CurrentUser() user: User, @Param('id') id: string) {
    return this.moviesService.removeFile(user, parseInt(id));
  }

  @Get()
  //   @UseGuards(AccessTokenGuard)
  whereRU(): string {
    return this.moviesService.whereRU();
  }
}
