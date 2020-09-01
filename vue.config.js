/* datura_lj 增加express 20171126 */
const express = require('express')
const app = express()



var apiRoutes = express.Router() /* 定义express.Router() 对象 */
app.use('/api', apiRoutes) /* 定义接口在/api目录下，方便管理 */
    /* datura接口 _end */
    /* datura接口 20170302 */


var appData = require('./cities.json') /* 引入根目录下goods.json数据文件 */
var cities = appData.cities /* goods.json文件文件下的.goods数据赋值给变量goods */
apiRoutes.get('/cities', function(req, res) { /* 定义接口并返回数据 */
    res.json({
        data: cities
    })
})



// 正在热映
var appData = require('./movie.json') /* 引入根目录下goods.json数据文件 */
var goods = appData.movieList /* goods.json文件文件下的.goods数据赋值给变量goods */
apiRoutes.get('/goods', function(req, res) { /* 定义接口并返回数据 */
    res.json({
        data: goods
    })
})

// 即将上影
var appComing = require('./coming.json')
var comingList = appComing.coming /* goods.json文件文件下的.goods数据赋值给变量goods */
apiRoutes.get('/coming', function(req, res) { /* 定义接口并返回数据 */
    res.json({
        data: comingList
    })
})

// 影院
var appCinema = require('./cinemas.json')
var cinemaList = appCinema.cinemas /* goods.json文件文件下的.goods数据赋值给变量goods */
apiRoutes.get('/cinemas', function(req, res) { /* 定义接口并返回数据 */
    res.json({
        data: cinemaList
    })
})




module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        },
        // 第二步找到devServer,
        // 在里面添加
        /* datura_lj 增加express 20171126 */
        before(app) {
            app.get('/api/goods', (req, res) => {
                res.json({
                    code: 200,
                    data: goods
                })
            });
            app.get('/api/coming', (req, res) => {
                res.json({
                    code: 200,
                    data: comingList
                })
            });
            app.get('/api/cinemas', (req, res) => {
                res.json({
                    code: 200,
                    data: cinemaList
                })
            })
            app.get('/api/cities', (req, res) => {
                res.json({
                    code: 200,
                    data: cities
                })
            })
        }




    }
}