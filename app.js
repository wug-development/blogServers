const App = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
// const onerror = require('koa-onerror')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const cors = require('koa-cors') // 跨域
// const session = require('koa-session-minimal')
// const MysqlStore = require('koa-mysql-session')

const routers = require('./routes/routers') // 获取路由
// const errorHandler = require('./config/errorHandler') // 异常处理

const app = new App()

// // session存储配置
// const sessionMysqlConfig = {
//     user: config.database.USERNAME,
//     password: config.database.PASSWORD,
//     database: config.database.DATABASE,
//     host: config.database.HOST,
// }
// 配置session中间件
// app.use(session({
//     key: 'USER_SID',
//     store: new MysqlStore(sessionMysqlConfig)
// }))

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
    maxAge: 365 * 24 * 60 * 60
}))

// global middlewares
app.use(views('views', {
    root: __dirname + '/views',
    default: 'jade'
}));

app.use(bodyParser({enableTypes: ['json', 'form', 'text']}))
app.use(json())
// app.use(logger())
app.use(cors())

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// routes definition
for(let r in routers) {
    app.use(routers[r].routes(), routers[r].allowedMethods())
}

// error handler
// onerror(app);

// error-handling
// app.on('error', (err, ctx) => {
//     console.error('server error', err, ctx)
//     // 未知异常状态，默认使用 500
//     // if(!err.status) err.status = 500
//     // ctx.status = err.status
//     // ctx.type = 'application/json'
//     // ctx.body = {error: err.message}
// });
// app.use(function* (next) {
//     yield* next;
//     if (this.response.status === 404 && !this.response.body) {
//         this.status = 404
//         this.type = 'application/json'
//         this.body = {
//             code: 404,
//             msg: 'Not found'
//         }
//     }
// });
app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 500) {
            ctx.status = ctx.status
            ctx.body = {
                code: 500,
                msg: '服务器错误'
            }
        }
    } catch (e) {
        ctx.app.emit('error', e, ctx)
    }
})
app.on('error', (err, ctx) => {
    console.log('error', ctx.body)
    ctx.status = 200
    ctx.body = 'OK'
})

app.listen(3001)
// errorHandler(app)

module.exports = app;
