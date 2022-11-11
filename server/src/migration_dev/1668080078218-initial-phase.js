const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialPhase1668080078218 {
    name = 'initialPhase1668080078218'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NOT NULL`);
    }
}
