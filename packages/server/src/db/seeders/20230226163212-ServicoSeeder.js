'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('Servicos', [
            { descricao: 'Diarista', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Eletricista', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Informática', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Frete', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Montador de Móveis', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Funilaria e Pintura', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Pintura de Imóveis', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Hidráulica', createdAt: new Date(), updatedAt: new Date() },
            { descricao: 'Pintura de Imóveis', createdAt: new Date(), updatedAt: new Date() },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Servicos', null, {});
    },
};
