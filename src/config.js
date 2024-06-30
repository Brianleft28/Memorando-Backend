import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 0,
    db: {
        host: process.env.HOST,
        user: process.env.USER, 
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
};

export default config;
