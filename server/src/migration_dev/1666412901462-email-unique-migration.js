const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class emailUniqueMigration1666412901462 {
    name = 'emailUniqueMigration1666412901462'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``);
    }
}
