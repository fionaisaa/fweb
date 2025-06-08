import clientPromise from "@/lib/mongodb"
import { Orari } from "@/pages/api/models/Orari"
import { ObjectId } from "mongodb"

const DB_NAME = "nextapp" 
const COLLECTION_NAME = "orari"

export const createOrari = async (orari: Orari) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...orari,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  return result
}

export const getOrari = async () => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const orari = await db.collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray()
  return orari
}

export const getOrariById = async (id: string) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  try {
    const orari = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return orari
  } catch (error) {
    return null
  }
}

export const updateOrari = async (id: string, orari: Partial<Orari>) => {
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
          ...orari,
          updatedAt: new Date()
        }
      }
    )
    return result
  } catch (error) {
    console.error("Gabim n update te orarit:", error)
    throw error
  }
}


export const deleteOrari = async (id: string) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id)
  })
  return result
}