const mysql = require('mysql2/promise');

export default async function database() {
    return await mysql.createConnection(
        {
            host: 'sql.freedb.tech',
            user: 'freedb_mlstomic',
            password: 'Rw?84Btp$6jFEqt',
            database: 'freedb_chatapp1',
            port: 3306
        }
    )
}