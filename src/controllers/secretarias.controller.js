/**
 * @file avance.controller.js
 * @author Roberto Corvalán
 */

import SecretariasRepository from '../repositories/SecretariasRepository.js';
import response from '../routes/response.js';

const secretariasRepository = new SecretariasRepository();

/**
 * @name index
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */

export async function index(req, res) {
    try {
        const result = await secretariasRepository.find();
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
        const result = await secretariasRepository.findOne(id);
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
        response.error(req, res, 'Parametro indefinido.!', 400);
    }

    try {
        const result = await secretariasRepository.create(body);
        response.success(req, res, result, 200);
        return result;
    } catch (error) {
        
        return response.error(req, res, 'Error en la base de datos.', error , 400);

    }
}

/**
 * @name update
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export async function update(req, res) {
    const id = parseInt(req.params.id);

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
        const result = await secretariasRepository.update(id, body);
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
        const result = await secretariasRepository.delete(id);
        console.log(result);
        response.success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        response.error(req, res, 'Hubo un error.!', 400);
    }
}
