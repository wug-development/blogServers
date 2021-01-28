const schema = require('./schemaRouter.js')
const auth = require('./authRouter.js')
const account = require('./accountRouter.js')
const article = require('./articleRouter.js')
const project = require('./projectRouter.js')
const types = require('./typeRouter.js')

module.exports = {
    schema,
    article,
    project,
    account,
    auth,
    types
}