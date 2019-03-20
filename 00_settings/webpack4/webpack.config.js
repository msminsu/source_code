const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 프로덕트시 dist폴더 삭제 플러그인
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 서버 띄울때마다 임시 index.html 파일 생성
// env 컴맨드라인 에서 전달해주는 온션 객체,//

const config = {

    entry: {
        app: ['./src/canvas/index.js']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true, // 서버에서 HMR 를 켠다
        // host: '0.0.0.0',// 디폴트로는 "localhost" 로 잡혀있다. 외부에서 개발 서버에 접속해서 테스트하기 위해서는 '0.0.0.0'으로 설정해야 한다.
        contentBase: path.resolve(__dirname, 'dist'), // 개발서버의 루트 경로
        stats: {
            color: true
        }
    },
    plugins: {

    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env",

                        ],
                    },
                }

            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg)$/,
                use: [
                    'url-loader',
                ]
            },
        ]
    }
}

module.exports = (env, options) => {

    // console.log(env,'------------------test')
    if (options.mode === 'development') {
        config.plugins = [
            new webpack.HotModuleReplacementPlugin(), // 브라우저 새로고침 없이 리로드 됨
            // new webpack.NamedModulesPlugin(),//브라우저에서 HMR 에러발생시 module name 표시
            new HtmlWebpackPlugin({
                title: 'Development',

                template: "./src/canvas/canvas.html",
                inject: true,
                showErrors: true // 에러 발생시 메세지가 브라우저 화면에 노출
            })
        ];

        config.devtool = 'inline-source-map';

        // config.devServer = {

        // };
    } else {
        config.plugins = [
            new CleanWebpackPlugin(['dist'])
        ];
    }

    return config;

}