import clientPromise from "@/lib/mongodb"
import { Blog } from "@/pages/api/models/Blog"
import { ObjectId } from "mongodb"

const DB_NAME = "nextapp" 
const COLLECTION_NAME = "blogs"

export const createBlog = async (blog: Blog) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...blog,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  return result
}

export const getBlogs = async () => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const blogs = await db.collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray()
  return blogs
}

export const getBlogById = async (id: string) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  try {
    const blog = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return blog
  } catch (error) {
    return null
  }
}

export const updateBlog = async (id: string, blog: Partial<Blog>) => {
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
          ...blog,
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


export const deleteBlog = async (id: string) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id)
  })
  return result
}