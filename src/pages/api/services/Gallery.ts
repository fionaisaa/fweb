import clientPromise from "@/lib/mongodb";
import { Gallery } from "@/pages/api/models/Gallery";
import { ObjectId } from "mongodb";

const DB_NAME = "nextapp";
const COLLECTION_NAME = "gallery";

// Krijon një foto te re ne gallery
export const createGallery = async (gallery: Gallery) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  // Hiq _id nëse ekziston sepse MongoDB e krijon vetë
  const { _id, ...galleryData } = gallery;

  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...galleryData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Kthe objektin me _id të ri si string
  return {
    _id: result.insertedId.toString(),
    ...galleryData,
  };
};

// Merr të gjithë gallerit
export const getGallery = async () => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const gallery = await db.collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return gallery;
};

// Merr një gallery sipas ID-së
export const getGalleryById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  try {
    const gallery = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
    return gallery;
  } catch (error) {
    return null;
  }
};

// Përditëson një gallery
export const updateGallery = async (id: string, gallery: Partial<Gallery>) => {
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
          ...gallery,
          updatedAt: new Date()
        }
      }
    );
    return result;
  } catch (error) {
    console.error("Gabim në updateGallery:", error);
    throw error;
  }
};

// Fshin një gallery
export const deleteGallery = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id)
  });
  return result;
};
