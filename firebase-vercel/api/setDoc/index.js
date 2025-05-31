const { setDoc } = require("../../lib/firebase")

module.exports = async (req, res) => {
  const {
    body: { collectionName, doc }
  } = req

  res.send(await setDoc(collectionName, doc))
}
