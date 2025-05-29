import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

let mongoClient = null
let database = null

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

export async function connectToDatabase(databaseName) {
  try {
    if (mongoClient && database) {
      return { database, mongoClient }
    }
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClient) {
        mongoClient = await new MongoClient(uri, options).connect()
        global._mongoClient = mongoClient
      } else {
        mongoClient = global._mongoClient
      }
    } else {
      mongoClient = await new MongoClient(uri, options).connect()
    }
    database = await mongoClient.db(databaseName)
    return { database, mongoClient }
  } catch (e) {
    console.error(e)
  }
}
