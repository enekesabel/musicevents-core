// extra utils to run test in intellij idea

require('ts-babel-node').register({},{
    "presets": [
        "env",
        "stage-2"
    ],
});

// async support
require('babel-polyfill');
