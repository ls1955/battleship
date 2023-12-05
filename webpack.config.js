const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Battleship",
            template: "./src/index.html",
        }),
    ],
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
