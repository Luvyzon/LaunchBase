const { Pool }  = require("pg") 

module.exports = new Pool({
    user: 'Matheus',
    password: "",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})