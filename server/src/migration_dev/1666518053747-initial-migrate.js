const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialMigrate1666518053747 {
    name = 'initialMigrate1666518053747'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`superUser\` tinyint NOT NULL DEFAULT 0, \`admin\` tinyint NOT NULL DEFAULT 0, \`adminSection1\` tinyint NOT NULL DEFAULT 0, \`adminSection2\` tinyint NOT NULL DEFAULT 0, \`adminSection3\` tinyint NOT NULL DEFAULT 0, \`section1ExpertL1\` tinyint NOT NULL DEFAULT 0, \`section1ExpertL2\` tinyint NOT NULL DEFAULT 0, \`section2ExpertL1\` tinyint NOT NULL DEFAULT 0, \`section2ExpertL2\` tinyint NOT NULL DEFAULT 0, \`section3ExpertL1\` tinyint NOT NULL DEFAULT 0, \`section3ExpertL2\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rolesId\` int NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`REL_5493e241ab6c27f36c7f9bae51\` (\`rolesId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5493e241ab6c27f36c7f9bae51a\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5493e241ab6c27f36c7f9bae51a\``);
        await queryRunner.query(`DROP INDEX \`REL_5493e241ab6c27f36c7f9bae51\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }
}
