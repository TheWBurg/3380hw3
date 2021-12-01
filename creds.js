const {Pool} = require ('pg');

/*const pool = new Pool({
    host: 'fanny.db.elephantsql.com',
    user: 'gfjpyxwk',
    password: 'hDkEk8ohal_y8TwGJkbz1sm_wC4cwNJJ',
    database: 'gfjpyxwk'
});*/

const pool = new Pool({
    "host": "3380db.cs.uh.edu",
    "user": "dbs007",
    "password": "dbs007",
    "database": "COSC3380",
    "port": "5432"
});

module.exports = pool;