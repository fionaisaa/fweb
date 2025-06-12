import {
  createMenuItem,
  getMenuItems,
} from "@/pages/api/services/Menu";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Krijo një menu item të ri
    const { name, description, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: "Ju lutem plotësoni fushat e nevojshme" });
    }

    try {
      const result = await createMenuItem({
        name,
        description,
        price,
        category,
        image,
        createdAt: new Date(),
        _id: undefined,
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Dështoi krijimi i menu item-it" });
    }
  }

  if (req.method === "GET") {
    try {
      const items = await getMenuItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Dështoi marrja e menu items" });
    }
  } else {
    res.status(405).json({ error: "Metoda nuk lejohet" });
  }
}