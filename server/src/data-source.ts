import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

interface IDBConfig {
  development: DataSourceOptions;
  test?: DataSourceOptions;
  production?: DataSourceOptions;
}

const dbConfig: IDBConfig = {
  development: {
    type: 'sqlite',
    database: 'devDB.sqlite',
    entities: [User],
    synchronize: false,
    migrations: ['src/migration_dev/*.js'],
  },
};

export const AppDataSource = new DataSource(
  dbConfig[`${process.env.NODE_ENV}`],
);
