import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const client = new MongoClient(uri, {
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


export const db = client.db("bookNestDB");


export const booksCollection = db.collection("books");
export const usersCollection = db.collection("users");

export default client;