// @ts-check
import MySQLAdapter from '../adapters/database/MySQLAdapter.js';

export default class BaseRepository {
    /**
     * @constructor
     * @param {string} entity Nombre de la tabla.
     */
    constructor(entity) {
        this.entity = entity;
        this.db = MySQLAdapter.getInstance();
    }

    /**
     * @name find
     * @returns {Promise<void>}

     */

    async find() {
        try {
            const query = `SELECT * FROM ${this.entity}`;
            const result = await this.db.executeQuery(query);
            return result;
        } catch (error) {
            // console.error(error);
            throw new Error(error.message);
        }
    }

    /**
     * @name findFiltered
     * @description Obtiene todos los registros de la tabla, filtrados por un left join en la tabla estados y secretarias, para mostrar sus nombres y no sus id.
     * @returns {Promise<void>}
     */

    async findFiltered(params = -1) {
        try {
            let query = `SELECT
                            memos.id,
                            memos.detalle,
                            memos.fecha,
                            memos.create_at,
                            secretarias.nombre AS secretaria_nombre,
                            estados.estado AS estado_nombre
                            FROM memos
                            LEFT JOIN secretarias ON memos.secretaria_id = secretarias.id
                            LEFT JOIN estados ON memos.estado_id = estados.id`

                            if (params !== -1) {
                                query += ` WHERE memos.secretaria_id = ${params}`
                            }

                            query += ' ORDER BY memos.id DESC';
            const result = await this.db.executeQuery(query);
            return result;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

   


    /**
     * @name findOne
     * @param {number} id
     * @returns {Promise<void>}
     */
    async findOne(id) {
        try {
            const query = `SELECT * FROM ${this.entity} WHERE id = ?`;
            const result = await this.db.executeQuery(query, [id]); // Utilizando un array de parámetros
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    }

    /**
     * @name store
     * @param {object} params
     * @returns {Promise<void>}
     */
    async create(params) {
        try {
            const query = `INSERT INTO ${this.entity} SET ?`;
            const result = await this.db.executeQuery(query, params);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * @name update
     * @param {number} id
     * @param {object} params
     * @returns {Promise<void>}
     */
    async update(id, params) {
        try {
            const query = `UPDATE ${this.entity} SET ? WHERE id = ?`;
            const result = await this.db.executeQuery(query, [params, id]); // Utilizando un array de parámetros
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * @name delete
     * @param {number} id
     * @returns {Promise<void>}
     */
    async delete(id) {
        try {
            const query = `DELETE FROM ${this.entity} WHERE id = ?`;
            const result = await this.db.executeQuery(query, [id]); // Utilizando un array de parámetros
            return result;
        } catch (error) {
            // console.error(error);
            throw new Error(error.message);
        }
    }
    /**
     * @name findIndexFiltered
     * @description Obtiene todos los registros de la tabla, filtrados por un left join en la tabla estados y secretarias, para mostrar sus nombres y no sus id. De un registro especifico, discriminado por su id.
     * @returns {Promise<void>}
     */

    async findIndexFiltered(id) {
        try {
            const query = `SELECT
                            memos.id,
                            memos.detalle,
                            memos.fecha,
                            memos.create_at,
                            secretarias.nombre AS secretaria_nombre,
                            estados.estado AS estado_nombre
                            FROM
                            memos
                            LEFT JOIN secretarias ON memos.secretaria_id = secretarias.id
                            LEFT JOIN estados ON memos.estado_id = estados.id
                            WHERE memos.id = ?;`;
            const result = await this.db.executeQuery(query, [id]);
            return result;
        } catch (error) {
            return error;
        }
    }
}
