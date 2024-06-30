// @ts-check
import mysql from 'mysql';
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
            password: config.db.pass,
            database: config.db.name,
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
            console.log('MySQL Connection established!');
            return true;
        });
    }

    /**
     * Ejecutar una consulta en la base de datos
     * @name executeQuery
     * @param {string} query - Consulta SQL
     * @param {any[]} params - Parámetros para la consulta
     * @returns {Promise<any>} - Promesa que se resuelve con el resultado de la consulta
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
