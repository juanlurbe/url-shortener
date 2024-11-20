const SERVER_PORT= process.env.SERVER_PORT|| 3000
const DB_NAME= process.env.DB_NAME
const DB_USER= process.env.DB_USER
const DB_PASS= process.env.DB_PASS
const DB_HOST= process.env.DB_HOST
const DB_DIALECT= process.env.DB_DIALECT
const DB_PORT= process.env.DB_PORT
const JWT_SECRET= process.env.JWT_SECRET
const ROLE_USER = process.env.ROLE_USER
const ROLE_ADMIN = process.env.ROLE_ADMIN


export {SERVER_PORT, DB_NAME, DB_DIALECT, DB_HOST, DB_PASS, DB_PORT, DB_USER, JWT_SECRET, ROLE_ADMIN, ROLE_USER}