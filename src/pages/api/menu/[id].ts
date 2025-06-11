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
      const menuItem = await getMenuItemById(id as string);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së menu item-it" });
    }
  }

  if (req.method === "PUT") {
    try {
      const data = req.body;
      const menuItem = await updateMenuItem(id as string, data);
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë përditësimit të menu item-it" });
    }
  }

 if (req.method === "DELETE") {
         try {
         const {id} = req.query;
         const menuItem = await deleteMenuItem(id as string);
         res.status(200).json(menuItem);
         } catch (error) {
         res.status(500).json({ message: "Gabim gjatë fshirjes së menu item-it" });
         }
     }
}
