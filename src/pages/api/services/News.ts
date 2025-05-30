import clientPromise from "@/lib/mongodb"
import { News } from "@/pages/api/models/News"
import { ObjectId } from "mongodb"

const DB_NAME = "nextapp" 
const COLLECTION_NAME = "news"

export const createNews = async (blog: News) => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).insertOne({
      ...blog,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return result
  }


  export const getNews = async () => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const news = await db.collection(COLLECTION_NAME)
      .find()
      .sort({ createdAt: -1 })
      .toArray()
    return news
  }

  export const getNewsById = async (id: string) => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    try {
      const news = await db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(id)
      })
      return news
    } catch (error) {
      return null
    }
  }

  export const updateNews = async (id: string, news: Partial<News>) => {
    try {
      if (!ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId");
      }
  
      const client = await clientPromise
      const db = client.db(DB_NAME)
      const result = await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...news,
            updatedAt: new Date()
          }
        }
      )
      return result
    } catch (error) {
      console.error("Gabim n updateBlog:", error)
      throw error
    }
  }

  export const deleteNews = async (id: string) => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
    return result
  }