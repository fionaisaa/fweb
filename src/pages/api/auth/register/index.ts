import { NextApiRequest, NextApiResponse } from "next";
import { createUser, getUser } from "../../services/User";
import bcrypt from "bcryptjs";
import { User } from "../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
      res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
  if (req.method === "POST") {
    const { name, email, password } = req.body as User;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Ju lutem plotësoni të gjitha fushat" });
    }
    try {
      const existingUser = await getUser(email);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "Email-i është i regjistruar tashmë" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      };
      const result = await createUser(newUser);
      if (!result) {
        return res.status(500).json({ error: "Gabim gjatë regjistrimit" });
        }
        res.status(201).json({ message: "Regjistrimi u krye me sukses" });

        
      // Save newUser to database (code for saving is not shown)
    } catch (error) {
      res.status(500).json({ error: "Gabim gjatë regjistrimit" });
    }
  } else {
     res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Metoda ${req.method} nuk është e lejuar`);
    
  }
}
