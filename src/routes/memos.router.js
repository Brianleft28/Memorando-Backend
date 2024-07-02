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
} from '../controllers/memos.controller.js';

const router = express.Router();

router.get('/memos', index);
router.post('/memos', store);
router.get('/memos/:id', show);
router.put('/memos/:id', update);
router.delete('/memos/:id', remove);

export default router;
