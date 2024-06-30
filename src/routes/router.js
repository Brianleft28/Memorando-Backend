// @ts-check
import memos from './memos.router.js';

const base = '/api/v1';

const router = function (server) {
    server.use(base, memos);
};

export default router;
