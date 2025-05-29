//WORKS
const moduleExports = require("../export/default/module.exports.js")

moduleExports()

//ERROR
try {
    const exportDefault = require("../export/default/export default.mjs")
    exportDefault()
} catch (e) {
    console.log(`require(..export default.mjs) - ERROR`)
}

