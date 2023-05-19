const path = require("path");

module.exports = {
    entry: "./background.js",
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'bundle.js', // Specify the output file name
    },
    resolve: {
        extensions: ['.js'],
    },
};
