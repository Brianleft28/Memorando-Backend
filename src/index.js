import app from './server.js';
import config from './config.js';

function main() {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

main();
