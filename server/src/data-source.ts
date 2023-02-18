import { DataSource, DataSourceOptions } from 'typeorm';
import { ChatIntendedParticipants } from './apps/CHAT/entities/intendedParticipants.entity';
import { ChatMessage } from './apps/CHAT/entities/messages.entity';
import { ChatRoom } from './apps/CHAT/entities/room.entity';
import { Post } from './apps/CRUD/components/posts/entities/post.entity';
import { Reaction } from './apps/CRUD/components/posts/entities/reaction.entity';
import { FileBuffer } from './apps/FILE/entities/fileBuffer.entity';
import { FileInfo } from './apps/FILE/entities/fileInfo.entity';
import { Tag } from './tags/entities/tag.entity';
import { PermissionRequest } from './users/entities/permission-requests.entity';
import { User } from './users/entities/user.entity';

interface IDBConfig {
  development: DataSourceOptions;
  test?: DataSourceOptions;
  production?: DataSourceOptions;
}

const dbConfig: IDBConfig = {
  development: {
    type: 'mysql',
    host: 'localhost', //'db',  //'localhost',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'dev_db',
    entities: [
      User,
      PermissionRequest,
      Post,
      Reaction,
      FileInfo,
      FileBuffer,
      Tag,
      ChatRoom,
      ChatMessage,
      ChatIntendedParticipants
    ],
    synchronize: true,
    // synchronize: false,
    // migrations: ['src/migration_dev/*.js'],
    logging: false,
  },
  test: {
    type: 'mysql',
    host: 'db',  //'localhost',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'test_db',
    entities: [
      User,
      PermissionRequest,
      Post,
      Reaction,
      FileInfo,
      FileBuffer,
      Tag,
      ChatRoom,
      ChatMessage,
      ChatIntendedParticipants
    ],
    synchronize: true,
    // synchronize: false,
    // migrations: ['src/migration_test/*.js'],
    logging: false,
    migrationsRun: true,
  },
};

export const AppDataSource = new DataSource(
  dbConfig[`${process.env.NODE_ENV}`],
);
