import "dotenv/config"
import { Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME 
const dbPort = Number(process.env.DB_PORT)  
const dbUser = process.env.DB_USER 
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  port: dbPort,
  logging: false
})

export default sequelizeConnection