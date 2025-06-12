import clientPromise from "@/lib/mongodb";
import { MenuItem } from "@/pages/api/models/Menu";
//import { menuitem } from "framer-motion/client";
import { ObjectId } from "mongodb";

const DB_NAME = "nextapp";
const COLLECTION_NAME = "menu";

export const createMenuItem = async (menuItem: MenuItem) => {
  const client = await clientPromise
  const db = client.db(DB_NAME)
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...menuItem,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  return result
}

export const getMenuItems = async () => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const menuItems = await db
    .collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return menuItems;
};

export const getMenuItemById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  try {
    const menuItem = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id),
    });
    return menuItem;
  } catch (error) {
    return null;
  }
};

export const updateMenuItem = async (id: string, menuItem: Partial<MenuItem>) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...menuItem,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Gabim në updateMenuItem:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id),
  });
  return result;
};