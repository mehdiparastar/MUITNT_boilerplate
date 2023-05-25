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
import { Response } from 'express';
import { AccessTokenGuard } from 'src/authentication/guards/accessToken.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';
import { UserRoles } from 'src/enum/userRoles.enum';
import { strToBool } from 'src/helperFunctions/strToBool';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { PaginationFilesDto } from '../FILE/dto/file/pagination-files.dto';
import { MovieFileDto } from './dto/movie/movie.dto';
import { MoviesService } from './movies.service';
import { MovieFileValidationPipe } from './validation.pipe';
// const NodeMediaServer = require('node-media-server');
import { MovieFileInfo } from './entities/movieFileInfo.entity';
import { MediaServerService } from './media-server.service';
import { PaginationMovieFilesDto } from './dto/movie/pagination-movies.dto';
import { createReadStream } from 'fs';

@Controller('movies_app')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly mediaServerService: MediaServerService,
  ) {}

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
    const record = await this.moviesService.findOneMovieFileInfoById(
      parseInt(id),
    );

    if (
      (record.private && user.id === record.owner.id) ||
      record.private === false
    ) {
      // const file = createReadStream(join(process.cwd(), 'package.json'))
      res.set({
        // 'Content-Type': record.type,
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${record.name}`,
      });

      const fileSegments = await this.moviesService.findMovieFileSegments(
        user,
        record.fileHash,
      );

      const combinedFile = new Blob(
        fileSegments.map((el) => el.file),
        { type: 'application/octet-stream' },
      );

      const arrayBuffer = await combinedFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // return fileSegments.forEach((segment) => {
      //   const readStream = createReadStream(segment.file);
      //   readStream.pipe(res);
      //   // return new StreamableFile(segment.file);
      // });

      return new StreamableFile(uint8Array);
    }
    throw new UnauthorizedException();
  }

  // @Get('stream-nms-file/:id')
  // async streamNMSVideo(@Param('id') id: number, @Res() res: Response) {
  //   try {
  //     const video = await this.moviesService.findOneMovieFileInfoById(id);

  //     if (!video) {
  //       throw new NotFoundException('Video not found');
  //     }

  //     // check if the video is stored in the database
  //     if (video.fileBuffer.file instanceof Buffer) {
  //       // start the media server
  //       const { streamKey, streamUrl } =
  //         await this.mediaServerService.createStream(video.fileHash);

  //       res.header('Content-Type', 'application/x-mpegURL');
  //       res.header(
  //         'Content-Disposition',
  //         `attachment; filename="${video.fileHash}.m3u8"`,
  //       );
  //       res.send(streamUrl);

  //       // const streamKey = 'test';
  //       // const hlsUrl = `http://localhost:8000/live/${streamKey}.m3u8`;

  //       // res.writeHead(200, {
  //       //   'Content-Type': 'video/mp4',
  //       //   'Transfer-Encoding': 'chunked',
  //       // });

  //       // res.end(JSON.stringify({ hlsUrl }));

  //       // // generate the HLS files and stream them to the response object
  //       // const streamPath = `/${video.id}/index.m3u8`;
  //       // nms.on('prePublish', (id, streamPath, args) => {
  //       //   nms.getSession(id).accept();
  //       // });
  //       // res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
  //       // res.setHeader('Content-Length', streamPath.length);
  //       // res.write(streamPath);
  //       // console.log(streamPath);
  //       // res.end();
  //     }
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

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
