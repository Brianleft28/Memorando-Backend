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
    remove
} from '../controllers/estados.controller.js';

const router = express.Router();

router.get('/estados', index);
router.post('/estados', store);
router.get('/estados/:id', show);

router.patch('/estados/:id', update);
router.delete('/estados/:id', remove);

export default router;
