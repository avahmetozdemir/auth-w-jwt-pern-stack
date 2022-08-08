import pg from 'pg'

const Pool = pg.Pool

const pool = new Pool({
    user : 'postgres',
    password: 'ahmet123',
    host: 'localhost',
    port :'5432',
    database : 'jwtpernlogin'
})

export default pool