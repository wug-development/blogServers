module.exports = (app) => {
    app.use(async (ctx, next) => {
        console.log(111)
        try {
            console.log(222)
            await next()
            console.log(333)
        } catch (err) {
            console.log(444, err)
            this.body = {
                code: err.status || 500,
                msg: err.message || '服务器错误'
            }
            if (err.status === 500) {
                this.app.emit('error', err, this)
            }
            return false
        }
    })
}
