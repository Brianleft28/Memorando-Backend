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
    
    /**
     * @name findByDate
     * @description Obtiene todos los registros de la tabla, filtrados por un left join en la tabla estados y secretarias, para mostrar sus nombres y no sus id. De un rango de fechas especifico
     * @comments debo revisar la consulta ya que no funciona correctamente.
     * 
    */

    async findByDate(fecha) {
        
        try {
            // Asegúrate de que la fecha cumple con el formato esperado (YYYY-MM-DD) antes de proceder    
            const query = `SELECT
                                memos.id,
                                memos.detalle,
                                memos.fecha,
                                memos.create_at,
                                secretarias.nombre AS secretaria_nombre,
                                estados.estado AS estado_nombre
                                FROM memos
                                LEFT JOIN secretarias ON memos.secretaria_id = secretarias.id
                                LEFT JOIN estados ON memos.estado_id = estados.id
                                WHERE memos.fecha = ?`;
            const result = await this.db.executeQuery(query, [fecha]); // Utilizando un array de parámetros
            console.log(result)
            return result;
        } catch (error) {
            console.error('error en la consulta de fecha', error);
            throw new Error(error.message);
        }
    }
}
