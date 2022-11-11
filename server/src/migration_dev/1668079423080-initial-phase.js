const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialPhase1668079423080 {
    name = 'initialPhase1668079423080'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``);
    }
}
