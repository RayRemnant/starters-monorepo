const { getDocs } = require("../../lib/firebase")

module.exports = async (req, res) => {
  const {
    body: { collectionName }
  } = req

  res.send(await getDocs(collectionName))
}
