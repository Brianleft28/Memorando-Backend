/**
 * @file memos.router.js
 * @author Roberto Corvalán
 */

import express from 'express';
import {
    index,
    store,
    show,
    update,
    remove,
} from '../controllers/secretarias.controller.js';

const router = express.Router();
//routas para api
router.get('/secretarias', index);
router.post('/secretarias', store);
router.get('/secretarias/:id', show);
router.put('/secretarias/:id', update);
router.delete('/secretarias/:id', remove);

export default router;
