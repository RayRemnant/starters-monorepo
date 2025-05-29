const { getDoc } = require("../../lib/firebase")

module.exports = async (req, res) => {
  const {
    body: { collectionName, docId }
  } = req

  res.send(await getDoc(collectionName, docId))
}
