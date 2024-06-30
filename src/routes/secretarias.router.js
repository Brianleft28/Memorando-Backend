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



router.get('/secretarias', index);
router.post('/secretarias', store);
router.get('/secretarias/:id', show);
router.patch('/secretarias/:id', update);
router.delete('/secretarias/:id', remove);

export default router;
