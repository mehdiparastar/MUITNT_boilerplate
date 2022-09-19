import { Module } from '@nestjs/common';
import { BlogService } from './service/blog.service';
import { BlogController } from './controller/blog.controller';

@Module({
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
