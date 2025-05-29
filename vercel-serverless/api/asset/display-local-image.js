const fs = require("fs")

export default (req, res) => {
  try {
    // Replace 'image.jpg' with the actual name and path of your local image file
    const imagePath = `${__dirname}/photo.jpeg`

    // Read the image file synchronously
    const imageBuffer = fs.readFileSync(imagePath)

    // Set appropriate headers for an image response
    res.setHeader("Content-Type", "image/jpeg") // Set the content type

    // Send the image buffer as the response
    res.status(200).send(imageBuffer)
  } catch (error) {
    res.status(500).send("Error fetching or serving image: " + error.message)
  }
}
