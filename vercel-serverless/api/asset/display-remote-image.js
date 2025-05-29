// gets external image and displays it
export default async (req, res) => {
  const imageRes = await fetch("https://images.unsplash.com/photo-1493612276216-ee3925520721")

  const imageBuffer = Buffer.from(await imageRes.arrayBuffer())

  res.setHeader("Content-Type", "image/jpeg")

  res.status(200).send(imageBuffer)
}
