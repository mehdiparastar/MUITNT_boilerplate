import { DataSource, DataSourceOptions } from 'typeorm';
import { Roles } from './users/entities/roles.entity';
import { User } from './users/entities/user.entity';

interface IDBConfig {
  development: DataSourceOptions;
  test?: DataSourceOptions;
  production?: DataSourceOptions;
}

const dbConfig: IDBConfig = {
  development: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'dev_db',
    entities: [User,Roles],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'],
    logging: false,
  },
  test: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'test_db',
    entities: [User,Roles],
    synchronize: false,
    migrations: ['src/migration_test/*.js'],
    logging: false,
  }
};

export const AppDataSource = new DataSource(
  dbConfig[`${process.env.NODE_ENV}`],
);
