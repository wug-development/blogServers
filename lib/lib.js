module.exports = {
    getID: function (v = '') {
        const d = new Date()
        let t = v
            + d.getFullYear()
            + String(d.getMonth() + 1).addSomeBefore(2)
            + String(d.getDate()).addSomeBefore(2)
            + String(d.getHours()).addSomeBefore(2)
            + String(d.getMinutes()).addSomeBefore(2)
            + String(d.getSeconds()).addSomeBefore(2)
            + Math.floor(Math.random() * 1000000000)
        return t
    }
}