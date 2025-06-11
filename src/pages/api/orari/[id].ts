import { deleteOrari, getOrariById, updateOrari } from "@/pages/api/services/Orari";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const news = await getOrariById(id as string);

      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së orarit" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const data = req.body;
      const news = await updateOrari(id as string, data);

      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë përditësimit të orarit" });
    }
  }
    if (req.method === "DELETE") {
        try {
        const { id } = req.query;
        const news = await deleteOrari(id as string);
    
        res.status(200).json(news);
        } catch (error) {
        res.status(500).json({ message: "Gabim gjatë fshirjes së orarit" });
        }
    }
}