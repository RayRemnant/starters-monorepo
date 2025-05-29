import { ObjectId } from "mongodb"

import handler from "../lib/handler"

// TODO: INCOMPLETE
export default async (req, res) => {
  const collection = await handler(req)
  const _ids = req.body.data.ids

  const filterById = { _id: { $in: _ids.map(id => ObjectId(id)) } }

  const { acknowledged, modifiedCount } = await collection.updateMany(
    filterById,
    {
      $currentDate: {
        lastUpdate: true
      }
    },
    { upsert: true }
  )

  res.status(200).json({ acknowledged, modifiedCount })
}
