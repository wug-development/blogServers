const App = require('koa')
const logger = require('koa-logger')
const json = require('koa-json')
const views = require('koa-views')
// const router=require('koa-router')
const onerror = require('koa-onerror')
const path = require('path')
const bodyParser = require('koa-bodyparser')
// const session = require('koa-session-minimal')
// const MysqlStore = require('koa-mysql-session')
const staticCache = require('koa-static-cache')
const cors = require('koa-cors') // 跨域

const index = require('./routes/index')
const users = require('./routes/users')
const schema = require('./routes/schemaRouter.js')

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
// app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
//     maxAge: 365 * 24 * 60 * 60
// }))

// global middlewares
app.use(views('views', {
    root: __dirname + '/views',
    default: 'jade'
}));

app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}))

// error handler
onerror(app);

app.use(json());
app.use(logger());
app.use(cors());

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});


// routes definition
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(schema.routes(), schema.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3001)

module.exports = app;
