const path = require("path");

module.exports = {
    entry: "./backgroud.js",
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'bundle.js', // Specify the output file name
    },
    resolve: {
        extensions: ['.js'],
    },
};
