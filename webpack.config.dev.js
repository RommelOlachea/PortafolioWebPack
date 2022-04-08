const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //agregamos el plugin de css al documento
const CopyPlugin = require('copy-webpack-plugin'); //agregamos el soporte para copy webpack, para copiar archivos en la carp. distconst Dotenv = require('dotenv-webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name][contenthash].js',  
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            {   //creamos la configuracion para el loader de css
                test: /\.css|.styl$/i, //se agrego la extension styl que corresponde a stylys
                use: [MiniCssExtractPlugin.loader,
                'css-loader','stylus-loader'], //asi mismo se agrego la configuracion para el loader de stylus
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit:10000,
                        mimetype: "application/font-woff",
                        name: "[name][contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    },
                }
            },
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(
            {
                filename: 'assets/[name].[contenthash].css'
            }
        ), //agregamos el recurso del plugin 
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(), //utilizamos esto para el manejo de variables de entorno
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        watchFiles: path.join(__dirname, "./**"), 
        compress: true,
        historyApiFallback: true,
        port: 3006,
        open: true, 
    },
}