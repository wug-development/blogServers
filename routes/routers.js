const schema = require('./schemaRouter.js')
const account = require('./accountRouter.js')
const article = require('./articleRouter.js')
const project = require('./projectRouter.js')

module.exports = {
    schema,
    article,
    project,
    account
}