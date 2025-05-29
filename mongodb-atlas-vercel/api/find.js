import handler from "../lib/handler"

export default async (req, res) => {
  const collection = await handler(req)

  const responseData = await collection.find(req.body.filter)

  res.status(200).json(responseData)
}
