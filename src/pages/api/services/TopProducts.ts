import clientPromise from "@/lib/mongodb";
import { MenuItem } from "@/pages/api/models/Menu"; // Mund ta ndrron në TopProduct nëse ke një model të veçantë
import { ObjectId } from "mongodb";

const DB_NAME = "nextapp";
const COLLECTION_NAME = "topproducts";

export const createTopProduct = async (product: MenuItem) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
};

export const getTopProducts = async () => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const products = await db
    .collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return products;
};

export const getTopProductById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  try {
    const product = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id),
    });
    return product;
  } catch (error) {
    return null;
  }
};

export const updateTopProduct = async (
  id: string,
  product: Partial<MenuItem>
) => {
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
          ...product,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Gabim në updateTopProduct:", error);
    throw error;
  }
};

export const deleteTopProduct = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id),
  });
  return result;
};
