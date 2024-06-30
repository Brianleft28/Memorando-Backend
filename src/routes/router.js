// @ts-check
import memos from './memos.router.js';
import secretarias from './secretarias.router.js';

const base = '/api/v1';

const router = function (server) {
    server.use(base, memos);
    server.use(base, secretarias);

};

export default router;
