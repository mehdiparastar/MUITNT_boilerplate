import { Module } from '@nestjs/common';
import { PostsModule } from './components/posts/posts.module';
import { CrudController } from './crud.controller';

@Module({
  imports: [PostsModule],
  controllers: [CrudController],
  providers: [],
})
export class CrudModule {}
