// @ts-check
import mysql from 'mysql'; // Change this line to use mysql2
import config from '../../config.js';

export default class MySQLAdapter {
    static instance; // Add static property 'instance'

    static getInstance() {
        if (!MySQLAdapter.instance) {
            MySQLAdapter.instance = new MySQLAdapter();
        }
        return MySQLAdapter.instance;
    }

    constructor() {
        this.connection = mysql.createConnection({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
        });
        this.#connect();
    }

    /**
     * @name connect
     */
    #connect() {
        this.connection.connect((err) => {
            if (err) {
                console.log(err.message);
                return false;
            }
            console.log('Connected to the MySQL server.');
            return true;
        });
    }

    /**
     * Execute a query in the database
     * @name executeQuery
     * @param {string} query - SQL query
     * @param {any[]} params - Parameters for the query
     * @returns {Promise<any>} - Promise that resolves with the result of the query
     */
    executeQuery = (query, params = []) => {
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (error, elements) => {
                if (error) {
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    };

    /**
     * @name close
     * @returns {Promise<void>}
     */
    close = () => {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    };
}
