const path = require('path');
module.exports = {
    entry: {
        index:__dirname + "/app/main.js",
        login:__dirname + "/app/login.js",
        homePage:__dirname + "/app/homePage.js",
        admin_img:__dirname + "/app/admin-img.js",
    },
    output: {
        path: __dirname + "/javascripts",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                loader: 'file-loader',
                options:{
                    name:'[name].[ext]?[hash]'
                }
            }
        ]
    },
    watch:true
}