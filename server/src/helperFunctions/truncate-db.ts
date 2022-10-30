import { AppDataSource } from '../data-source';

const truncateDB = async () => {
  const entities = AppDataSource.entityMetadatas;
  if (process.env.NODE_ENV === 'test') {
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`SET FOREIGN_KEY_CHECKS = 0;`);
      await repository.query(`TRUNCATE table ${entity.tableName};`);
      await repository.query(`SET FOREIGN_KEY_CHECKS = 1;`);
    }
  } else {
    throw new Error('DB truncating is only possible in testing mode.');
  }
};

export { truncateDB };
