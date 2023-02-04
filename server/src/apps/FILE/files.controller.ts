import {
  Body,
  Controller,
  Delete,
  Get, Param, Post,
  Query,
  Res,
  StreamableFile, UploadedFiles,
  UseGuards,
  UseInterceptors
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
import { TagDto } from 'src/tags/dto/tag.dto';
import { CurrentUser } from 'src/users/decorators/current-user.middleware';
import { User } from 'src/users/entities/user.entity';
import { FileDto } from './dto/file/file.dto';
import { PaginationFilesDto } from './dto/file/pagination-files.dto';
import { FilesService } from './files.service';
import { FileValidationPipe } from './validation.pipe';
import { createHash } from 'crypto'

@Controller('files_app')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('uploads')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRoles.fileAppUserML)
  @UseInterceptors(
    FilesInterceptor('files',
      // {
      //   storage: diskStorage({
      //     destination: './src/apps/FILE/uploads',
      //     filename: (req, file, callback) => {
      //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      //       const ext = extname(file.originalname);
      //       const filename = `${uniqueSuffix}${ext}`
      //       callback(null, filename)
      //     }
      //   })
      // }
    ))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { // 👈 this property
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
    @UploadedFiles(FileValidationPipe) files: Array<Express.Multer.File>) {

    const tags: TagDto[][] = (files.length > 1 ? tags_ : [tags_]).map(item => JSON.parse(item))
    const private_: boolean[] = (files.length > 1 ? private__ : [private__]).map(item => strToBool(item))

    const res = await this.filesService.uploads(
      files.map((file, index) => {
        const hashSum = createHash('sha256');
        hashSum.update(file.buffer)
        const fileHash = hashSum.digest('hex')

        return ({
          ...file,
          fileHash,
          owner: user,
          tags: (tags && tags[index]) || [],
          private: private_[index],
        })
      }))
    return res
  }


  @Get('all-files')
  @UseGuards(AccessTokenGuard)
  @Serialize(PaginationFilesDto)
  async getAllFiles(
    @CurrentUser() user: User,
    @Query('skip') skip: string,
    @Query('limit') limit: string,
    @Query('isPrivate') isPrivate: string,
    @Query('tagsFilter') tagsFilter: string | undefined
  ) {
    return await this.filesService.findAll(
      parseInt(skip),
      parseInt(limit),
      strToBool(isPrivate),
      tagsFilter ? tagsFilter.split(',').map(item => parseInt(item)) : undefined,
      user
    );
  }

  @Get('get-file/:id')
  @UseGuards(AccessTokenGuard)
  // @Serialize(FileDto)
  async getFile(/*@CurrentUser() user: User, */@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    const record = await this.filesService.findOneById(parseInt(id))

    // const file = createReadStream(join(process.cwd(), 'package.json'))
    res.set({
      'Content-Type': record.type,
      'Content-Disposition': `attachment; filename=${record.name}`,
    });

    return new StreamableFile(record.file)
  }

  @Delete('delete-file/:id')
  @UseGuards(AccessTokenGuard)
  @Serialize(FileDto)
  removePReq(@CurrentUser() user: User, @Param('id') id: string) {
    return this.filesService.removeFile(user, parseInt(id));
  }

  @Get()
  //   @UseGuards(AccessTokenGuard)
  whereRU(): string {
    return this.filesService.whereRU();
  }
}
