import {
  createTopProduct,
  getTopProducts,
} from "@/pages/api/services/TopProducts";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Krijo një produkt të ri
    const { name, description, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        error: "Ju lutem plotësoni fushat e nevojshme",
      });
    }

    try {
      const result = await createTopProduct({
        name,
        description,
        price,
        category,
        image,
        createdAt: new Date(),
        _id: undefined, // opsional
      });

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Dështoi krijimi i produktit" });
    }
  } else if (req.method === "GET") {
    try {
      const items = await getTopProducts();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Dështoi marrja e produkteve" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Metoda ${req.method} nuk lejohet` });
  }
}
