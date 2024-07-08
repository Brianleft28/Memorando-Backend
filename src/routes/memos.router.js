/**
 * @file memos.router.js
 * @author Roberto Corvalán
 */

import express from 'express';
import {
    store,
    show,
    update,
    remove,
    showFiltered,
    indexFiltered,
    getMemosBySecretariaId,
    getMemosByDate,
} from '../controllers/memos.controller.js';

const router = express.Router();

router.post('/memos', store);
router.get('/memosFiltrado', showFiltered);
router.get('/memos/:id', show);
router.get('/memos/detail/:id', indexFiltered);
router.patch('/memos/:id', update);
router.delete('/memos/:id', remove);
router.get('/memos/:id/filtrado', getMemosBySecretariaId); 

router.get('/memos/:fecha/filtrado', getMemosByDate);


export default router;
