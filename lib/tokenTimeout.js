const { getToken } = require('./tokenDeal')
const url = require('url')
/**
 * 处理token过期
*/
class TokenTimeout {
    /**
     * 先进行token失效401处理
     */
    static dealTimeout (ctx, next) {
        return next().catch((err) => {
            if (401 == err.status) {
                ctx.status = 200;
                // ctx.body = 'Protected resource, use Authorization header to get access\n';
                ctx.body = {
                    code: 401,
                    msg: 'Unauthorized Token'
                };
            } else {
                throw err;
            }
        });
    }

    /**
     * 判断token是否过期（过期则判断是否在10分钟之内，如果在10分钟之内发送请求则给用户重新刷新token）
     */
    static async checkToken (ctx, next) {
        //获取生成token时的过期时间,判断是否在允许过期延迟时间范围内，如果是则重新生成token返回，否则报错#begin
        let payload = {};
        let _token = ctx.header.token
        console.log('ctx.body')
        console.log(ctx.url)
        if (ctx.url.indexOf('/auth/') > -1) {
            await next()
        } else if (_token && _token.indexOf('BlogM ') > -1) {
            try {
                payload = await getToken(_token.split(' ')[1]);
            } catch (err) {
                console.log(err.message, new Date(err.expiredAt).getTime());
                if (err.message === 'jwt expired') {
                    payload.exp = parseInt(new Date(err.expiredAt).getTime() / 1000);
                } else {
                    throw err;
                }
            }
            if (payload && payload.exp) {
                var allowTime = parseInt(new Date().getTime() / 1000) - parseInt(payload.exp);
                if (allowTime > -1 && allowTime <= 600 || allowTime < 0) {
                    await next();
                } else {
                    ctx.throw(401, 'Bad Token header format. Format is "Token: BlogM"');
                }
            } else {
                ctx.throw(401, 'Bad Token header format. Format is "Token: BlogM"');
            }
        } else {
            await next()
        }
    }
}
module.exports = TokenTimeout