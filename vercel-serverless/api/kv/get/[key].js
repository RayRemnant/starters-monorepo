import { kv } from "@vercel/kv"

//use as domain.com/api/kv/get/<key>

export default async (req, res) => {
  const { key } = req.query
  try {
    const value = await kv.get(key)
    res.send(`the value of ${key} is ${value}`)
  } catch (error) {
    res.send(`${key} not found. \nError:${error}`)
    // Handle errors
  }
}
