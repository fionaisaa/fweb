import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from "@/pages/api/services/Blog"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    
    // Create a new blog
    const { title, body } = req.body
    try {
      const result = await createBlog({
        title, body, createdAt: new Date(),
        _id: undefined
      })
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ error: "Failed to create blog" })
    }
  }
  if(req.method === "GET") {
    try {
        const blogat = await getBlogs();
        res.status(200).json(blogat)

    } catch (error) {
        res.status(500).json({ error: "Failed to get blogs" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }

}