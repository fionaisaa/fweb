import {
  deleteMenuItem,
  getMenuItemById,
  updateMenuItem,
} from "@/pages/api/services/Menu";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await getMenuItemById(id as string);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së produktit" });
    }
  } else if (req.method === "PUT") {
    try {
      const data = req.body;
      const updatedProduct = await updateMenuItem(id as string, data);
      res.status(200).json(updatedProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gabim gjatë përditësimit të produktit" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = await deleteMenuItem(id as string);
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë fshirjes së produktit" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Metoda ${req.method} nuk lejohet`);
  }
}
