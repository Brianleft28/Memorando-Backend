// @ts-check
import BaseRepository from './BaseRepository.js';

export default class MemosRepository extends BaseRepository {
    /**
     * @constructor
     */
    constructor() {
        super('memos');
    }

    /**
     * @name findAll
     * @returns {Promise<void>}
     */
    async findAll() {
        try {
            const query = `SELECT
                m.id,
                m.secretaria_id_desde,
                m.secretaria_id_hacia,
                m.detalle,
                m.estado_id,
                e.estados
            FROM memo AS m
            LEFT JOIN estados AS e ON m.estado_id = e.id`;
            const result = await this.db.executeQuery(query);
            return result;
        } catch (error) {
            // console.error(error);
            throw new Error(error.message);
        }
    }
}
