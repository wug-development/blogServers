module.exports = {
    init () {
        String.prototype.addSomeBefore = function (len, v = '0') {
            if (this.length < len) {
                const n = len - this.length
                let s = Array(n).join(v)
                s = s.slice(0, n)
                return s + this
            } else {
                return this
            }
        }
    }
}