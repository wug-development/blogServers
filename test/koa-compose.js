/**
 * 手写koa 中间件的实现
 * @param {中间件数组} middlewares 
 */
function compose (middlewares) {
    return function (context, next) {
        let index = -1
        return dispatch(0)

        function dispatch (i) {
            index = i
            let fn = middlewares[i]
            if (i === middlewares.length) fn = next
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}