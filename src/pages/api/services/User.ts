import clientPromise from "@/lib/mongodb"
import { User } from "@/pages/api/models/User"
import bcrypt from "bcryptjs"
import { ObjectId } from "mongodb"

const DB_NAME = "nextapp" 
const COLLECTION_NAME = "users"

// export const createUser = async (users: User) => {
//     const client = await clientPromise
//     const db = client.db(DB_NAME)
//     const result = await db.collection(COLLECTION_NAME).insertOne({
//       ...users,
//       createdAt: new Date(),
//       // updatedAt: new Date()
//     })
//     return result
//   }

  export const createUser = async (data: User) => {
      const client = await clientPromise
      const db = client.db(DB_NAME)
      const result = await db.collection(COLLECTION_NAME).insertOne({
        ...data,
        createdAt: new Date(),
      })
      return result;
    }



    export const getUser = async (email: string) => {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        try {
        const user = await db.collection(COLLECTION_NAME).findOne({
            email: email
        })
        return user
        } catch (error) {
        return null
        }
    }

  export const getUserById = async (id: string) => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    try {
      const user = await db.collection(COLLECTION_NAME).findOne({
        _id: new ObjectId(id)
      })
      return user
    } catch (error) {
      return null
    }
  }

  export const updateUser = async (id: string, user: Partial<User>) => {
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
            ...user,
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

  export const deleteUser = async (id: string) => {
    const client = await clientPromise
    const db = client.db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
    return result
  }

  export async function ensureAdminUser(){
    const ADMIN_EMAIL ="admin@example.com";
    const ADMIN_PASSWORD = "admin123";
    const ADMIN_NAME = "Admin User";

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const existingAdmin = await db.collection(COLLECTION_NAME).findOne({
      email:ADMIN_EMAIL.toLowerCase(),
      role:"admin"
    });
    
    if(!existingAdmin){
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await db.collection(COLLECTION_NAME).insertOne({
        name:ADMIN_NAME,
        email:ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        role:"admin",
        createdAt: new Date()
      });
      console.log("Admin user created successfully");
    }
  }

  ensureAdminUser().catch(err =>{
    console.error("Failed to ensure admin user:", err);
  });
    
  