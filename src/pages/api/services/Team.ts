import clientPromise from "@/lib/mongodb";
import { Team } from "@/pages/api/models/Team";
import { ObjectId } from "mongodb";

const DB_NAME = "nextapp";
const COLLECTION_NAME = "teams";

// Krijon një anëtar të ri të ekipit
export const createTeam = async (team: Team) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  // Hiq _id nëse ekziston sepse MongoDB e krijon vetë
  const { _id, ...teamData } = team;

  const result = await db.collection(COLLECTION_NAME).insertOne({
    ...teamData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Kthe objektin me _id të ri si string
  return {
    _id: result.insertedId.toString(),
    ...teamData,
  };
};

// Merr të gjithë anëtarët e ekipit
export const getTeams = async () => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const teams = await db.collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return teams;
};

// Merr një anëtar të ekipit sipas ID-së
export const getTeamById = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  try {
    const team = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    });
    return team;
  } catch (error) {
    return null;
  }
};

// Përditëson një anëtar të ekipit
export const updateTeam = async (id: string, team: Partial<Team>) => {
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
          ...team,
          updatedAt: new Date()
        }
      }
    );
    return result;
  } catch (error) {
    console.error("Gabim në updateTeam:", error);
    throw error;
  }
};

// Fshin një anëtar të ekipit
export const deleteTeam = async (id: string) => {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(id)
  });
  return result;
};
