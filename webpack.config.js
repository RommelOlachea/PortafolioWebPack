const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //agregamos el plugin de css al documento
const CopyPlugin = require('copy-webpack-plugin'); //agregamos el soporte para copy webpack, para copiar archivos en la carp. dist

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',        
    },
    resolve: {
        extensions: ['.js']
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
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(), //agregamos el recurso del plugin 
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname,"src", "assets/images"),
                    to: "assets/images"
                }
            ]
        })
    ]
}