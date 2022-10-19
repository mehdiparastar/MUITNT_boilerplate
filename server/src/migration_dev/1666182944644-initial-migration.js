const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialMigration1666182944644 {
    name = 'initialMigration1666182944644'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`superUser\` tinyint NOT NULL DEFAULT 0, \`admin\` tinyint NOT NULL DEFAULT 0, \`expert_l1\` tinyint NOT NULL DEFAULT 0, \`expert_l2\` tinyint NOT NULL DEFAULT 0, \`user_l1\` tinyint NOT NULL DEFAULT 0, \`user_l2\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rolesId\` int NULL, UNIQUE INDEX \`REL_5493e241ab6c27f36c7f9bae51\` (\`rolesId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5493e241ab6c27f36c7f9bae51a\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5493e241ab6c27f36c7f9bae51a\``);
        await queryRunner.query(`DROP INDEX \`REL_5493e241ab6c27f36c7f9bae51\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }
}
