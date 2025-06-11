import { createOrari, getOrari, getOrariById, updateOrari, deleteOrari } from "@/pages/api/services/Orari"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    
    // Create a new orar
    const { emri, orari } = req.body
    try {
      const result = await createOrari({
        emri, orari, createdAt: new Date(),
        _id: undefined
      })
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: "Failed to create orar" })
    }
  }
  if(req.method === "GET") {
    try {
        const oraret = await getOrari();
        res.status(200).json(oraret)

    } catch (error) {
        res.status(500).json({ error: "Failed to get oraret" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }

}