// gets external file and serves it as a download
export default async (req, res) => {
  try {
    // Replace 'file.zip' with the desired filename for the downloaded file
    const fileName = "file.zip"

    // Replace 'fileBuffer' with your actual file buffer
    const fileRes = await fetch("https://www.dwsamplefiles.com/?dl_id=559")

    const fileBuffer = Buffer.from(await fileRes.arrayBuffer())

    // Set appropriate headers for the file download response
    res.setHeader("Content-Type", "application/octet-stream") // Set the content type
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`) // Set the filename for download

    // Send the file buffer as the response body
    res.status(200).send(fileBuffer)
  } catch (error) {
    res.status(500).send("Error serving download: " + error.message)
  }
}
