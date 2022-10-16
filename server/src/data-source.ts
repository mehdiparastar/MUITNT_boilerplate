import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

interface IDBConfig {
  development: DataSourceOptions;
  test?: DataSourceOptions;
  production?: DataSourceOptions;
}

export const AppDataSource = (configService: ConfigService<IconfigService>) => {
  const dbConfig: IDBConfig = {
    development: {
      type: 'sqlite',
      database: configService.get<string>('DB_NAME'),
      entities: [],
      synchronize: false,
      migrations: ['src/migration_dev/*.js'],
    },
  };
  return new DataSource(dbConfig[`${process.env.NODE_ENV}`]);
};
