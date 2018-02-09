
exports.up = (knex, Promise) => {
    return knex.schema.createTable('user', table => {
        table.increments().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('user');
};
