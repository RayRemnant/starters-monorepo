//remove the "_" in the file name and test locally to see if the variables are set

export default async (req, res) => {
  const one = process.env.KV_REST_API_READ_ONLY_TOKEN
  const two = process.env.KV_REST_API_TOKEN
  const three = process.env.KV_REST_API_URL
  const four = process.env.KV_URL

  res.send(`env variables ${one}\n ${two}\n, ${three}\n, ${four}`)
}
