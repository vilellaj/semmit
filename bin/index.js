#!/usr/bin/env node
const semmit = require('../lib/semmit.js');

(async () => {
    await semmit
        .start()
        .catch((error) => console.error(error));
})();
