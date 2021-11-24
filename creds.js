const {Pool} = require ('pg');

const pool = new Pool({
    host: 'fanny.db.elephantsql.com',
    user: 'gfjpyxwk',
    password: 'hDkEk8ohal_y8TwGJkbz1sm_wC4cwNJJ',
    database: 'gfjpyxwk'
});

module.exports = pool;