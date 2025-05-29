import { kv } from "@vercel/kv"

//use as domain.com/api/kv/set?<key>=<value>&<key2>=<value2>

export default async (req, res) => {
  const queryParams = req.query

  try {
    for (const key in queryParams) {
      const value = queryParams[key]
      await kv.set(key, value /* { ex: 100, nx: true } */)
      res.send(`${key} was set to ${value}`)
    }
  } catch (error) {
    res.send(error)
  }
}
