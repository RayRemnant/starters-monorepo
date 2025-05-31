import type { VercelRequest, VercelResponse } from "@vercel/node"

export default async (req: VercelRequest, res: VercelResponse) => {
  res.send(
    "Firebase + Vercel API starter, see repo at https://github.com/RayRemnant/starters-monorepo/tree/main/firebase-vercel"
  )
}
