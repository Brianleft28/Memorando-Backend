/**
 * @file avance.controller.js
 * @author Roberto Corvalán
 */

import MemoRepository from '../repositories/MemosRepository.js';
import response from '../routes/response.js';

const memoRepository = new MemoRepository();

/**
 * @name index
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */

export async function index(req, res) {
    try {
        const result = await memoRepository.find();
        response.success(req, res, result, 200);
        return result;
    } catch (error) {
        console.log(error);
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name showFiltered
 * @param {Request} req
 *
 */

export async function showFiltered(req, res) {
    try {
        const result = await memoRepository.findFiltered();
        response.success(req, res, result, 200);
        return result;
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name getMemosBySecretariaId
 * @param {Request} req
 * @param {Response} res
 *
 */

export async function getMemosBySecretariaId(req, res) {
    const id = parseInt(req.params.id); // Convertimos el valor de req.params.id a un número
    if (!id || isNaN(id)) {
        // Verificamos si id es un número válido
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    try {
        const result = await memoRepository.findFiltered(id);
        response.success(req, res, result, 200);
    } catch (error) {
        console.log('error filtrando por secretaria_id',error)
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name getMemosByDate
 * 
 */

export async function getMemosByDate(req, res) {

    const fecha = req.params.fecha;
        console.log(typeof(fecha))

    if (!fecha) {
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    try {
        const result = await memoRepository.findByDate(fecha);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name show
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 * @param {number} req.params.id
 */
export async function show(req, res) {
    const id = parseInt(req.params.id); // Convertimos el valor de req.params.id a un número
    if (!id || isNaN(id)) {
        // Verificamos si id es un número válido
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    try {
        const result = await memoRepository.findOne(id);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name store
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function store(req, res) {
    const body = req.body;

    if (!body) {
        response.error(req, res, 'Parametro indefinido.!, no hay cuerpo', 400);
    }

    try {
        const result = await memoRepository.create(body);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, `Parametro indefindo.!, ${error}`, 400);
    }
}

/**
 * @name update
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function update(req, res) {
    const id = parseInt(req.params.id); // Convertimos el valor de req.params.id a un número
    const body = req.body;

    if (!id || isNaN(id)) {
        // Verificamos si id es un número válido
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    if (!body) {
        response.error(req, res, 'Parametro indefinido.!', 400);
    }
    try {
        const result = await memoRepository.update(id, body);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

/**
 * @name remove
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function remove(req, res) {
    const id = parseInt(req.params.id); // Convertimos el valor de req.params.id a un número
    if (!id || isNaN(id)) {
        // Verificamos si id es un número válido
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    try {
        const result = await memoRepository.delete(id);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}

export async function indexFiltered(req, res) {
    const id = parseInt(req.params.id);
    if (!id || isNaN(id)) {
        response.error(req, res, 'Parametro indefinido.!', 400);
        return;
    }
    try {
        const result = await memoRepository.findIndexFiltered(id);
        response.success(req, res, result, 200);
    } catch (error) {
        response.error(req, res, 'Hubo un error.!', 400);
    }
}
