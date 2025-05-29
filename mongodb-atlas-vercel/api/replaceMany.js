import handler from "../lib/handler"

//TODO: to implement.
export default async (req, res) => {
  const collection = await handler(req)

  const docs = req.body.data
  const responseData = []

  for (const doc of docs) {
    const { id, ...docWithoutId } = doc

    const { acknowledged, insertedId } = await collection.replaceOne(
      { _id: id },
      {
        ...docWithoutId,
        $currentDate: { lastUpdate: true }
      },
      { upsert: true }
    )

    responseData.push({ acknowledged, insertedId })
  }

  res.status(200).json(responseData)
}
