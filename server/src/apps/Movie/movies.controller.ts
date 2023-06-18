import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { createReadStream, existsSync } from 'fs';
import * as path from 'path';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { strToBool } from 'src/helperFunctions/strToBool';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { MovieFileDto } from './dto/movie/movie.dto';
import { PaginationMovieFilesDto } from './dto/movie/pagination-movies.dto';
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { MediaServerService } from './media-server.service';
import { MoviesService } from './movies.service';
import { MovieFileValidationPipe } from './validation.pipe';

@Controller('movies_app')
export class MoviesController {
  private uploadPath: string;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly NMS: MediaServerService,
  ) {
    this.uploadPath = path.join(process.cwd(), '..', 'uploads'); // Define your upload directory
    this.NMS = new MediaServerService();
  }

  @Get('socket_initializing')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserLL)
  async socketInitilizing() {
    return {};
  }

  @Get('movie_conversion/:id')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserLL)
  async movieConversionCompleteStatus(@Param('id') id: string) {
    const fileInfo = await this.moviesService.findOneMovieFileInfoById(
      parseInt(id),
    );
    return { [id]: fileInfo.streamable };
  }

  @Post('uploads')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserML)
  @UseInterceptors(
    FilesInterceptor('files', 100, {
      limits: { fileSize: 1024 * 1024 * 1024 * 10 },
    }),
  )
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
    @Body('fileHash') fileHash: string,
    @Body('fileInfoId') fileInfoId: string,
    @Body('segmentNo') segmentNo: string,
    @UploadedFiles(MovieFileValidationPipe) files: Array<Express.Multer.File>,
  ) {
    const res = await this.moviesService.uploads(
      files.map((file, index) => {
        return {
          ...file,
          fileHash: fileHash,
          owner: user,
          fileInfoId: parseInt(fileInfoId),
          segmentNo: parseInt(segmentNo),
        };
      }),
      user,
    );
    return res;
  }

  @Get('all-files')
  @UseGuards(AccessTokenGuard)
  @Serialize(PaginationMovieFilesDto)
  async getAllFiles(
    @CurrentUser() user: User,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
    @Query('isPrivate') isPrivate: string,
    @Query('tagsFilter') tagsFilter: string | undefined,
  ) {
    // if (!this.NMS.hasHttpServer()) {
    //   await this.NMS.start();
    //   this.NMS.setEvents();
    // }
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
    @Res() res: Response,
  ) {
    try {
      const fileInfo = await this.moviesService.findOneMovieFileInfoById(
        parseInt(id),
      );

      if (
        (fileInfo.private && user.id === fileInfo.owner.id) ||
        fileInfo.private === false
      ) {
        const filePath = path.join(this.uploadPath, `${fileInfo.id}`);

        if (!existsSync(filePath)) {
          throw new NotFoundException('File not found');
        }
        const stream = createReadStream(filePath);
        const fileSize = fs.statSync(filePath).size;

        res.set({
          // 'Content-Type': fileInfo.type,
          'Content-Type': 'application/octet-stream',
          'Content-Length': fileSize,
          // 'Content-Disposition': `attachment; filename=${fileInfo.name}`,
        });

        stream.pipe(res);

        // return new StreamableFile(stream); //if you want to use this, you should replace `@Res({ passthrough: true }) res: Response` instead of `@Res() res: Response`
      } else {
        throw new UnauthorizedException();
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  @Get('get-file-chunk/:id/:chunkSize/:chunkNumber')
  @UseGuards(AccessTokenGuard)
  async getFileChunk(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Param('chunkSize') chunkSize: string,
    @Param('chunkNumber') chunkNumber: string,
    @Res() res: Response,
  ) {
    try {
      const fileInfo = await this.moviesService.findOneMovieFileInfoById(
        parseInt(id),
      );

      if (
        (fileInfo.private && user.id === fileInfo.owner.id) ||
        fileInfo.private === false
      ) {
        const filePath = path.join(this.uploadPath, `${fileInfo.id}`);

        if (!existsSync(filePath)) {
          throw new NotFoundException('File not found');
        }

        const fileSize = fs.statSync(filePath).size;

        const start = Number(chunkNumber) * Number(chunkSize);
        const end = Math.min(start + Number(chunkSize) - 1, fileSize - 1);

        res.setHeader('Content-Length', end - start + 1);

        const fileStream = createReadStream(filePath, { start, end });
        fileStream.pipe(res);
      } else {
        throw new UnauthorizedException();
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  @Delete('delete-file/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(MovieFileDto)
  async removeFile(@CurrentUser() user: User, @Param('id') id: string) {
    return this.moviesService.removeFile(user, parseInt(id));
  }

  @Post('create-movie-files-info')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserML)
  async createMovieFilesInfo(
    @CurrentUser() user: User,
    @Body() body: Partial<MovieFileInfo>[],
  ) {
    return this.moviesService.createMovieFilesInfo(user, body);
  }

  @Post('set-uploading-file-as-completed')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.movieAppUserML)
  async setUploadingFileAsCompleted(
    @CurrentUser() user: User,
    @Body('fileInfoId') fileInfoId: number,
  ) {
    return this.moviesService.setUploadingFileAsCompleted(user, fileInfoId);
  }

  @Get()
  //   @UseGuards(AccessTokenGuard)
  whereRU(): string {
    return this.moviesService.whereRU();
  }
}
