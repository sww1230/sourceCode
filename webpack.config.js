var path = require('path');
var webpack = require('webpack');
var args = require('node-args');

var config = {
    entry: {
        build: './View/index.js'
    },
    output: {
        path: path.join(__dirname, '/Lib'),
        publicPath: '/Lib/',
        filename: '[name].js'
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('antd', 'antd.js')
    ],

    devServer: {
        proxy: {
            /* 
             * proxy配置例子
             *
             * '/some/*': {
             *     target: 'http://cdn.staticfile.org/',
             *     ignorePath: true,  //忽略请求的路径，直接转发target的内容
             *     changeOrigin: true,  //更改请求的域名（服务器）
             *     secure: false,  //是否校验ssl证书
             *     rewrite: function(req) {
             *         req.url = req.url.replace(/^\/some/, '');
             *     }
             * },
             */

            //业务数据接口
            '/api/*': {
                target: 'http://pdms3.cx.test.yunshanmeicai.com/',
                changeOrigin: true,
            },

        },
        // 配置hosts 127.0.0.1 local.test.yunshanmeicai.com
        //本地开发时，兼容HTML5 history API（可以在任意路径下刷新，返回index.html的内容加载React应用）
        //参考：http://webpack.github.io/docs/webpack-dev-server.html#the-historyapifallback-option
        historyApiFallback: true,

    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel?presets[]=react,presets[]=es2015"
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.png$/,
            exclude: /node_modules/,
            loader: "url-loader"
        }, {
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.(eot|woff|woff2|ttf|svg)$/,
            loader: "file-loader"
        }, {
            test: /\.md$/,
            loader: 'bisheng/lib/loaders/markdown-loader'
        }]
    },
}

// {
//                test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
//                loader : 'url?prefix=font/&limit=10000'
//             }


//用webpack自带的-d组合项代替
//if (args.minify) {
//    config.plugins = [
//        new webpack.optimize.UglifyJsPlugin({
//            compress: {
//                warnings: true
//            }
//        }),
//        new webpack.optimize.OccurenceOrderPlugin(),
//        new webpack.DefinePlugin({
//            'process.env.NODE_ENV': '"production"' //production
//        }),
//        // new webpack.HotModuleReplacementPlugin(),
//        // new webpack.optimize.CommonsChunkPlugin('antd', 'antd.js')
//    ];
//}

//如果是-p生产环境的build，设置NODE_ENV
if (args.p) {
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"' //production
        }),
    ];
}


module.exports = config;