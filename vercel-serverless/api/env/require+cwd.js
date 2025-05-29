const func = require(process.cwd() + "/lib/file.js")

export default async (req, res) => {
  res.send(func())
}
