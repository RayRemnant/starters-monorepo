const fs = require("fs").promises

const deleteAllFilesInFolder = async folderPath => {
  try {
    const files = await fs.readdir(folderPath)

    for (const file of files) {
      const filePath = folderPath + "/" + file
      await fs.unlink(filePath)
      console.log(`${file} was deleted successfully.`)
    }
  } catch (err) {
    console.error("Error deleting files:", err)
  }
}
