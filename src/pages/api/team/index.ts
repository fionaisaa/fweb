import { createTeam, getTeams } from "@/pages/api/services/Team";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, role, description, image } = req.body;
    try {
      const result = await createTeam({
        name,
        role,
        description,
        image,
        createdAt: new Date(),
        _id: undefined
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to create team member" });
    }
  } else if (req.method === "GET") {
    try {
      const teamMembers = await getTeams();
      res.status(200).json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: "Failed to get team members" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
