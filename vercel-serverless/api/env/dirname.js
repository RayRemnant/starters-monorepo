export default async (req, res) => {
  res.send("__dirname = " + __dirname + "\nprocess.cwd() = " + process.cwd())
}
