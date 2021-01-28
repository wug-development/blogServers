const App = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const cors = require('koa-cors') // 跨域
const token = require('./lib/tokenTimeout')
const extendMethod = require('./lib/extendMethod')

const routers = require('./routes/routers') // 获取路由

const app = new App()
extendMethod.init()

// 处理token 过期
app.use(token.dealTimeout)
app.use(token.checkToken)

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
// 跨域
app.use(cors())

app.use(function *(next){
    var start = new Date
    yield next
    var ms = new Date - start
    console.log('%s %s - %s', this.method, this.url, ms);
});

// routes definition
for(let r in routers) {
    app.use(routers[r].routes(), routers[r].allowedMethods())
}

app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status >= 300) {
            ctx.status = 200
            ctx.body = {
                code: ctx.status,
                msg: '服务器错误'
            }
        }
    } catch (e) {
        ctx.app.emit('error', e, ctx)
    }
})
app.on('error', (err, ctx) => {
    ctx.status = 200
    ctx.body = {
        code: 500,
        msg: '服务器错误',
        reason: err.message
    }
})

app.listen(3001)

module.exports = app;
