module.exports = {
    development: {
        client: 'pg',
        // Provide database name
        connection: 'postgres://localhost/auth'
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL
    }
};