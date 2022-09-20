import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogController } from './blog/controller/blog.controller';
import { BlogSchema } from './blog/schemas/blog.schema';
import { BlogService } from './blog/service/blog.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mehdi:mpmp1370@localhost:27017', {
      dbName: 'blogdb',
    }),
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [AppController, BlogController],
  providers: [AppService, BlogService],
})
export class AppModule {}
