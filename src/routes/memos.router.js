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
<<<<<<< HEAD
router.get('/memos/detail/:id', indexFiltered);
router.patch('/memos/:id', update);
=======
router.put('/memos/:id', update);
>>>>>>> 3302208772028e1c294303171bf2b047f4299f56
router.delete('/memos/:id', remove);
router.get('/memos/:id/filtrado', getMemosBySecretariaId); 

router.get('/memos/:fecha/filtrado', getMemosByDate);


export default router;
