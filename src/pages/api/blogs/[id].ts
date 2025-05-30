import { deleteBlog, getBlogById, updateBlog } from "@/pages/api/services/Blog";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;

      const news = await getBlogById(id as string);

      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë marrjes së newsut" });
    }
  }
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const data = req.body;
      const news = await updateBlog(id as string, data);

      res.status(200).json(news);
    } catch (error) {
      res.status(500).json({ message: "Gabim gjatë përditësimit të newsut" });
    }
  }
    if (req.method === "DELETE") {
        try {
        const { id } = req.query;
        const news = await deleteBlog(id as string);
    
        res.status(200).json(news);
        } catch (error) {
        res.status(500).json({ message: "Gabim gjatë fshirjes së newsut" });
        }
    }
}