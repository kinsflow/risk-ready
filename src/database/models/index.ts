import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const databaseUrl: string = (process.env.DATABASE_URL as string) || '';

export const sequelize = new Sequelize(databaseUrl,
    {
        dialectOptions: {
            ssl: process.env.NODE_ENV == 'production' && {
                require: true,
                rejectUnauthorized: false
            }
        }
    });