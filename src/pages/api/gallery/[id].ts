import { deleteGallery, getGalleryById, updateGallery }  from "@/pages/api/services/Gallery";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

  if (!id) {
    return res.status(400).json({ message: "ID e gallery-it mungon" });
  }

  try {
    if (req.method === "GET") {
      const gallery = await getGalleryById(id);
      return res.status(200).json(gallery);
    }

    if (req.method === "PUT") {
      const data = req.body;
      const updated = await updateGallery(id, data);
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const deleted = await deleteGallery(id);
      return res.status(200).json(deleted);
    }

    // Nëse metoda nuk lejohet
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Gabim në API /gallery/[id]:", error);
    return res.status(500).json({ message: "Gabim i brendshëm i serverit" });
  }
}
