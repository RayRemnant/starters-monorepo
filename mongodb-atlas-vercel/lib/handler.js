import getCollection from "./getCollection"

export default async req => {
  if (req.method == "POST") {
    const { collectionName, databaseName } = req.body
    return await getCollection(databaseName, collectionName)
  }
}
