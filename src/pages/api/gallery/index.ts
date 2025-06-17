import { createGallery, getGallery } from "@/pages/api/services/Gallery";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, role, description, image } = req.body;
    try {
      const result = await createGallery({
        image,
        createdAt: new Date(),
        _id: undefined
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create gallery" });
    }
  } else if (req.method === "GET") {
    try {
      const galleryPhotos = await getGallery();
      res.status(200).json(galleryPhotos);
    } catch (error) {
      res.status(500).json({ error: "Failed to get gallery" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
