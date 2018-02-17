// Future update - Create different tables for method types(local, OAuth)
exports.up = (knex, Promise) => {
    return knex.schema.createTable('user', table => {
        table.increments().notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('googleId');
    })
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('user');
};
