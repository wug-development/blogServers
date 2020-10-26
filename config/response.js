const callback = (that, params) => {
    that.response.status = 200;
    that.body = Object.assign({
        code: 200,
        msg: 'success',
        data: {}
    }, params)
}

const catchs = (that, err, msg) => {
    that.response.status = 412;
    that.body = {
        code: 412,
        msg: msg || '获取失败',
        reason: JSON.stringify(err),
    }
}

const notFound = (that, msg) => {
    that.response.status = 416;
    that.body = {
        code: 416,
        msg: msg || '获取失败'
    }
}

const tryCatch = async (that, fn, msg) => {
    try {
        let data = await fn()
        callback(that, { data })
    } catch (err) {
        catchs(that, err, msg)
    }
}

module.exports = {
    callback,
    tryCatch,
    catchs,
    notFound
}