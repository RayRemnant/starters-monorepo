import type { VercelRequest, VercelResponse } from "@vercel/node"

import { setDoc } from "../_firebase"

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body: { collectionName, doc }
  } = req

  res.send(await setDoc(collectionName, doc))
}
