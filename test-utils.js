require('ts-babel-node').register({},{
    "presets": [
        "env",
        "stage-2"
    ],
});

// async support
require('babel-polyfill');
