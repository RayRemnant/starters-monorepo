// gets external image and serves it as a download
export default async (req, res) => {
  const imageRes = await fetch("https://images.unsplash.com/photo-1493612276216-ee3925520721")

  const imageBuffer = Buffer.from(await imageRes.arrayBuffer())

  console.log("content-type:", imageRes.headers.get("content-type"))

  // maybe you can use this too see if the image's too large
  // to send downstream
  res.setHeader("content-type", imageRes.headers.get("content-type") || "image/*")

  res.setHeader("content-length", imageRes.headers.get("content-length"))

  res.setHeader("Content-Disposition", 'attachment; filename="tomato.jpeg"')

  return res.status(200).send(imageBuffer)
}
